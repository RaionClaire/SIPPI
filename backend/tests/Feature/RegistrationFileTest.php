<?php

namespace Tests\Feature;

use App\Models\RegistrationFile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RegistrationFileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_registration_file(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $file = UploadedFile::fake()->create('proposal.pdf', 1024, 'application/pdf');

        $response = $this->postJson('/api/berkas', [
            'type' => 'proposal',
            'file' => $file,
        ]);

        $response->assertCreated()
            ->assertJsonStructure([
                'message',
                'data' => ['id', 'user_id', 'type', 'file_path', 'filename'],
                'url',
            ])
            ->assertJsonFragment([
                'type' => 'proposal',
                'filename' => 'proposal.pdf',
                'user_id' => $user->id,
            ]);

        $filePath = $response->json('data.file_path');
        $this->assertTrue(Storage::disk('public')->exists($filePath));

        $this->assertDatabaseHas('registration_files', [
            'user_id' => $user->id,
            'type' => 'proposal',
            'filename' => 'proposal.pdf',
        ]);
    }

    public function test_user_can_update_their_registration_file(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $oldFile = UploadedFile::fake()->create('old.pdf', 500, 'application/pdf');
        $oldPath = $oldFile->store('registration_files', 'public');

        $registrationFile = RegistrationFile::create([
            'user_id' => $user->id,
            'type' => 'proposal',
            'file_path' => $oldPath,
            'filename' => 'old.pdf',
        ]);

        $newFile = UploadedFile::fake()->create('new.pdf', 600, 'application/pdf');

        $response = $this->putJson("/api/berkas/{$registrationFile->id}", [
            'file' => $newFile,
        ]);

        $response->assertOk()
            ->assertJsonFragment([
                'filename' => 'new.pdf',
            ]);

        $this->assertFalse(Storage::disk('public')->exists($oldPath));
        $this->assertTrue(Storage::disk('public')->exists($response->json('data.file_path')));
    }

    public function test_user_cannot_update_other_users_file(): void
    {
        Storage::fake('public');

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $file = UploadedFile::fake()->create('file.pdf', 500, 'application/pdf');
        $filePath = $file->store('registration_files', 'public');

        $registrationFile = RegistrationFile::create([
            'user_id' => $user1->id,
            'type' => 'proposal',
            'file_path' => $filePath,
            'filename' => 'file.pdf',
        ]);

        Sanctum::actingAs($user2);

        $newFile = UploadedFile::fake()->create('new.pdf', 600, 'application/pdf');

        $response = $this->putJson("/api/berkas/{$registrationFile->id}", [
            'file' => $newFile,
        ]);

        $response->assertForbidden();
    }

    public function test_deleting_registration_file_removes_physical_file(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $file = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');
        $filePath = $file->store('registration_files', 'public');

        $registrationFile = RegistrationFile::create([
            'user_id' => $user->id,
            'type' => 'kompre',
            'file_path' => $filePath,
            'filename' => 'document.pdf',
        ]);

        $this->assertTrue(Storage::disk('public')->exists($filePath));

        $response = $this->deleteJson("/api/berkas/{$registrationFile->id}");

        $response->assertOk();
        $this->assertFalse(Storage::disk('public')->exists($filePath));
        $this->assertDatabaseMissing('registration_files', ['id' => $registrationFile->id]);
    }
}

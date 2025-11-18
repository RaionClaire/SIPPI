<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_valid_credentials(): void
    {
        $password = 'secret123';
        $user = User::factory()->create([
            'password' => Hash::make($password),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'user' => ['id', 'name', 'email', 'role'],
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Email atau password salah']);
    }

    public function test_admin_can_register_new_user(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'secret123',
            'role' => 'mahasiswa',
        ]);

        $response->assertCreated()
            ->assertJsonFragment([
                'message' => 'Registrasi pengguna berhasil',
                'email' => 'newuser@example.com',
                'role' => 'mahasiswa',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'role' => 'mahasiswa',
        ]);
    }

    public function test_non_admin_cannot_register_users(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Unauthorized',
            'email' => 'unauthorized@example.com',
            'password' => 'secret123',
            'role' => 'user',
        ]);

        $response->assertForbidden();
    }

    public function test_guest_cannot_register_users(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Guest Attempt',
            'email' => 'guest@example.com',
            'password' => 'secret123',
            'role' => 'user',
        ]);

        $response->assertUnauthorized();
    }
}

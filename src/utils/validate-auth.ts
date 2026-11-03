/** Giriş, kayıt ve şifremi unuttum sayfalarının doğrulama kuralları (saf fonksiyonlar). */

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+$/.test(value.trim());
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!isEmail(email)) errors.email = "Geçerli bir e-posta girin.";
  if (password.length < 6) errors.password = "Şifre en az 6 karakter olmalı.";
  return errors;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export function validateRegister(data: RegisterData): RegisterErrors {
  const errors: RegisterErrors = {};
  if (data.name.trim().length < 3) errors.name = "Ad soyad en az 3 karakter olmalı.";
  if (!isEmail(data.email)) errors.email = "Geçerli bir e-posta girin.";
  if (data.password.length < 6) errors.password = "Şifre en az 6 karakter olmalı.";
  if (data.password2 !== data.password) errors.password2 = "Şifreler aynı değil.";
  return errors;
}

/** Hata yoksa boş metin döner. */
export function validateForgot(email: string): string {
  return isEmail(email) ? "" : "Geçerli bir e-posta girin.";
}

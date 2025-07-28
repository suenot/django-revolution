# Настройка переменных окружения

## Создание .env файла

Создайте файл `.env` в корне проекта `django_sample/` со следующим содержимым:

```bash
# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
POSTGRES_DB=trading_signals

# Django Configuration
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database URL (for external PostgreSQL)
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```

## Установка зависимостей

```bash
poetry install
```

## Запуск миграций

```bash
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

## Проверка подключения

```bash
poetry run python manage.py check
```

## Запуск сервера

```bash
poetry run python manage.py runserver
```

## Доступ к API

- **Swagger UI (Trading API):** http://localhost:8000/schema/trading/schema/swagger/
- **Trading API endpoints:** http://localhost:8000/api/trading/
- **Admin panel:** http://localhost:8000/admin/ 
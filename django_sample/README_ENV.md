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

# Database Configuration
# PostgreSQL используется по умолчанию
```

## Переменные окружения

### PostgreSQL Configuration
- `POSTGRES_HOST` - адрес PostgreSQL сервера (по умолчанию: localhost)
- `POSTGRES_PORT` - порт PostgreSQL (по умолчанию: 5432)
- `POSTGRES_USER` - пользователь базы данных (по умолчанию: postgres)
- `POSTGRES_PASSWORD` - пароль пользователя (установите в .env файле)
- `POSTGRES_DB` - название базы данных (по умолчанию: trading_signals)

### Django Configuration
- `DEBUG` - режим отладки (True/False)
- `SECRET_KEY` - секретный ключ Django
- `ALLOWED_HOSTS` - разрешенные хосты
- PostgreSQL используется по умолчанию

## Установка зависимостей

```bash
poetry install
```

## Запуск миграций

```bash
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

## Создание суперпользователя

```bash
poetry run python manage.py createsuperuser
```

## Запуск сервера

```bash
poetry run python manage.py runserver
```

## Доступ к API

### Trading Signals API
- **Swagger UI:** http://localhost:8000/schema/trading/schema/swagger/
- **API Endpoints:** http://localhost:8000/api/trading/
  - `/api/trading/channels/` - каналы
  - `/api/trading/messages/` - сообщения
  - `/api/trading/signals/` - торговые сигналы

### Admin Panel
- **Admin:** http://localhost:8000/admin/
- **Username:** admin
- **Password:** (установите при создании)

## Модели базы данных

### Channel (Каналы)
- `name` - название канала
- `telegram_id` - Telegram ID канала
- `created_at` - дата создания
- `updated_at` - дата обновления

### Message (Сообщения)
- `channel` - связь с каналом
- `telegram_message_id` - Telegram ID сообщения
- `date` - дата сообщения
- `text` - текст сообщения
- `media_path` - пути к медиа файлам (JSON)
- `created_at` - дата создания
- `updated_at` - дата обновления

### Signal (Торговые сигналы)
- `message` - связь с сообщением
- `channel` - связь с каналом
- `direction` - направление (LONG/SHORT)
- `ticker` - тикер
- `entry_price` - цена входа
- `entry_price_now` - текущая цена входа
- `leverage` - плечо
- `stop_loss` - стоп-лосс
- `timestamp` - временная метка
- `take_profits` - целевые цены (JSON)
- `created_at` - дата создания
- `updated_at` - дата обновления

## База данных

### PostgreSQL (используется по умолчанию)
```bash
poetry run python manage.py runserver
```

Все данные хранятся в PostgreSQL базе данных, указанной в .env файле. 
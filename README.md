# Описание
Этот проект представляет собой веб-приложение с использованием NestJS. Оно имеет модуль для работы с авторизацией и ролями, код для работы с профилем, текстовый блок (имеет возможно работы с файлами) и сам файловый модуль.

[auth](src/auth/): этот каталог содержит модуль для работы с авторизацией и ролями.
[blocks](src/blocks/): этот каталог содержит модуль для работы с текстовыми блоками.
[exceptions](src/exceptions/): этот каталог содержит самописную ошибку валидации данных.
[files](src/files/): этот каталог содержит модуль работы с файлами.
[pipes](src/pipes/): этот каталог содержиит пайп валидации.
[profiles](src/profiles/): этот каталог содержит модуль для работы с профилем.
[roles](src/roles/): этот каталог содержит модуль для работы с ролями.
[users](src/users/): этот каталог содержит модуль для работы с пользователями.
[app.module](src/app.module.ts): файл с настройками приложения.
[main](src/main.ts): стартовый файл приложения.
[development.env](.development.env): конфигурационный файл для разработки.
[production.env](.production.env): конфигурационный файл для продакшена.

# API-маршруты
[Примеры](examples)
Доступны следующие маршруты API:

GET /users - получить всех пользователей (admin)
POST /users/role - назначить роль пользователю (admin)

GET /roles - получить описание роли по значению (admin)
POST /roles - создать новую роль

POST /profiles - добавление профиля (user)
POST /profiles/admin - добавление профиля (admin)
GET /profiles - получение профиля (user)
GET /profiles/:userId - получение профиля (admin)
GET /profiles/admin/all - получение всех профилей (admin)
PUT /profiles - обновление профиля (user)
PUT /profiles/admin - обновление профиля (admin)
DELETE /profiles - удаление профиля (user)
DELETE /profiles/admin/:userId - удаление профиля (admin)

POST /files - добавление файла (admin)
GET /files/:id - получение файла по id (все)
DELETE /files - удаление устаревших файлов (admin)

POST /blocks - создание нового блока (admin)
GET /blocks - получение всех блоков (все)
GET /blocks/group - получение блоков по группам (все)
GET /blocks/:id - получение блока по id (все)
PUT /blocks/:id - обновление блока по id (admin)
DELETE /blocks/:id - удаление блока по id (admin)
# VALORA API

## Endpoints

### Shënime (Notes)
- `GET /api/notes` - Merr të gjithë shënimet
- `POST /api/notes` - Krijo një shënim të ri
- `GET /api/notes/:id` - Merr një shënim të veçantë
- `PUT /api/notes/:id` - Përditëso një shënim
- `DELETE /api/notes/:id` - Fshij një shënim

### Detyra (Tasks)
- `GET /api/tasks` - Merr të gjithë detyrat
- `POST /api/tasks` - Krijo një detyrë të re
- `PUT /api/tasks/:id` - Përditëso një detyrë
- `DELETE /api/tasks/:id` - Fshij një detyrë

### Qëllime (Goals)
- `GET /api/goals` - Merr të gjithë qëllimet
- `POST /api/goals` - Krijo një qëllim të ri
- `PUT /api/goals/:id` - Përditëso një qëllim
- `DELETE /api/goals/:id` - Fshij një qëllim

## Authentication
Në fazën e ardhshme do të implementohet autentifikimi JWT.

## Database
Së pari përdorim localStorage, më vonë do të kalojmë në backend me bazë të dhënash.

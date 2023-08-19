FROM python:3.9.1-alpine
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /server
COPY requirements.txt ./
COPY manage.py ./
RUN apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  python3 -m pip install -r requirements.txt && \
  apk --purge del .build-deps
# RUN python manage.py makemigrations
# RUN python manage.py migrate
# ENV NODE_ENV production
COPY . ./
ENV SECRET_KEY=
ENV DEBUG=False
ENV ALLOWED_HOSTS="*"
ENV CORS_ORIGIN_WHITELIST="http://localhost:3000"
ENV OPENAI_API_KEY=
ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/beantalks"
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# "python", "manage.py", "migrate", "&&", 
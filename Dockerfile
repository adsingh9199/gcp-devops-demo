FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app/ .

RUN groupadd --gid 10001 appgroup && \
    useradd --uid 10001 \
            --gid 10001 \
            --create-home \
            --shell /usr/sbin/nologin \
            appuser
RUN chown -R 10001:10001 /app

USER 10001:10001

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "app:app"]

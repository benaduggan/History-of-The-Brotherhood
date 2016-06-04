FROM python:2.7
MAINTAINER benaduggan

ENV PYTHONUNBUFFERED 1

# Install linux dependencies
RUN apt-get update && apt-get install -y python-dev libncurses5-dev libxml2-dev libxslt-dev zlib1g-dev libjpeg-dev s3cmd curl rsync && pip install --upgrade pip

# Make the directory for our code
RUN mkdir /data /log && chown -R www-data:www-data /log
WORKDIR /data

# Install pip dependencies
ADD app/requirements.txt /data/requirements.txt
RUN pip install -r requirements.txt

# Copy app files over to container
COPY app/ /data/
RUN chmod 777 /data/bin/run.sh

CMD ["/bin/sh", "-c", "/data/bin/run.sh"]

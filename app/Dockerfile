FROM node:11-stretch-slim

COPY ./package.json /app/package.json
WORKDIR /app

RUN set -ex \
	&& buildDeps=" \
        python \
        make \
        build-essential \
	" \
	&& apt-get update && apt-get install -y $buildDeps --no-install-recommends \
	&& yarn install \
	&& apt-get purge -y --auto-remove $buildDeps \
	&& rm  -Rf /var/lib/apt/lists/*

COPY . /app

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]

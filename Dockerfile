 # Made By Leviathenn
FROM ubuntu
RUN apt-get update 
RUN apt-get upgrade -y
RUN apt-get install sudo -y
RUN apt-get install wget curl clang clangd gcc make cmake lua5.2 python3-pip telnet -y

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > out.sh
RUN chmod +x out.sh
RUN sh out.sh -y
RUN mkdir /workspace


RUN groupadd -r taskdaemon
RUN groupadd np
RUN useradd -r -g taskdaemon taskdaemon
RUN useradd -g np np
WORKDIR /tmp/setup
WORKDIR /runner/
COPY ./runner/info.json /runner/info.json
COPY ./runner/runner /usr/bin/runner
RUN runner
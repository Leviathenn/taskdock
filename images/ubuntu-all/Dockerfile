 # Made By Leviathenn
FROM ubuntu
RUN apt-get update 
RUN apt-get upgrade -y
RUN apt-get install sudo -y
RUN apt-get install wget curl clang clangd gcc make cmake lua5.2 python3-pip telnet unzip iputils-ping -y
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs > out.sh
RUN chmod +x out.sh
RUN sh out.sh -y
RUN mkdir /workspace

RUN groupadd -r taskdaemon
RUN groupadd np
RUN useradd -r -g taskdaemon taskdaemon
RUN useradd -g np np
USER taskdaemon
RUN usermod --password tdmon taskdaemon
RUN curl -fsSL https://bun.sh/install | bash
WORKDIR /tmp/setup
WORKDIR /runner/
COPY ./runner/runner /usr/bin/runner
COPY ./runner/info.json /runner/info.json
RUN chmod +x /usr/bin/runner
RUN echo 13152 > /runner/port
RUN /usr/bin/runner
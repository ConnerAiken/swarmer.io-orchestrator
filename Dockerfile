FROM node:10

ENV DIR /app 

RUN mkdir -p ${DIR}
WORKDIR ${DIR} 

# You may be wondering why we copied package.json first.
# it is so we utilize docker's cached layers properly
COPY package.json /app
RUN npm install
COPY . ${DIR} 
RUN chmod +x scripts/boot.sh
 

EXPOSE 8080
ENTRYPOINT [ "./scripts/boot.sh" ]
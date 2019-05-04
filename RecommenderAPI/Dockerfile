FROM lizhen0909/ubuntu1604py36:latest
COPY . /RecommenderAPI
WORKDIR /RecommenderAPI
RUN apt-get update
#RUN python3 -m venv env
#RUN source env/bin/activate
RUN pip install numpy
RUN pip install pandas
RUN pip install surprise
RUN pip install --upgrade tensorflow
RUN pip install Flask
EXPOSE 5000
CMD python3 MainAPI.py
#CMD export FLASK_APP=MainAPI.py && \ export FLASK_ENV=production && \ flask run
#RUN cd RecommenderAPI
#RUN export FLASK_APP=MainAPI.py
#RUN export FLASK_ENV=production

#CMD ["export FLASK_APP=MainAPI.py", "export FLASK_ENV=production", "flask run"]
#CMD bash

# FROM ubuntu:latest
# #MAINTAINER Rajdeep Dua "dua_rajdeep@yahoo.com"
# RUN apt-get update -y
# RUN apt-get install -y python-pip python-dev build-essential
# COPY . /RecommenderAPI
# WORKDIR /RecommenderAPI
# RUN pip install -r requirements.txt
# ENTRYPOINT ["python"]
# CMD ["MainAPI.py"]
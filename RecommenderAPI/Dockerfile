# FROM lizhen0909/ubuntu1604py36:latest
# COPY . /RecommenderAPI
# WORKDIR /RecommenderAPI
# RUN apt-get update
# RUN pip install numpy
# RUN pip install pandas
# RUN pip install surprise
# RUN pip install --upgrade tensorflow
# RUN pip install Flask
# EXPOSE 5000
# CMD python3 MainAPI.py

FROM sabbir1cse/ubuntu-python-pip-supervisor
# #MAINTAINER Rajdeep Dua "dua_rajdeep@yahoo.com"
RUN apt-get update -y
#RUN apt-get install -y python3-pip python3-dev build-essential
# #RUN apt-get install subversion -y
COPY . /RecommenderAPI
WORKDIR /RecommenderAPI
# #RUN pip install -r requirements.txt
RUN pip install numpy
RUN pip install pandas
RUN pip install surprise
RUN pip install --upgrade tensorflow
RUN pip install Flask
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["MainAPI.py"]

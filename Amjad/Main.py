# -*- coding: utf-8 -*-
"""
Created on Mon Apr 29 17:58:33 2019

@author: Amjad
"""

from flask import Flask, request, jsonify
import RBMBakeOff
import AutoRecBakeOff
import BakeOff
import surprise
from dataset.AddRating import addRate
from dataset.AddRating import addManyRate
from apscheduler.schedulers.background import BackgroundScheduler
#from RBMBakeOff import TrainModel

app = Flask(__name__)
print(app)




def home():
    return "Hello World"

def trainNow():
     # print("Hello")
     BakeOff.TrainModel()

sched = BackgroundScheduler(daemon=True)
sched.add_job(trainNow,'interval',seconds=86400)
sched.start()
# minutes=60
# hours=1
# test api


# train the model 
# TrainModel()
    
# trainning rbm
@app.route("/rbm/train", methods=['GET'])
def trainRbm():
    RBMBakeOff.TrainModel()
    return "Done"

# trainning auto rec
@app.route("/autorec/train", methods=['GET'])
def trainAutoRec():
    AutoRecBakeOff.TrainModel()
    return "Done"

@app.route("/train/all", methods=['GET'])
def trainAll():
    BakeOff.TrainModel()
    return "Done"


# test model
    
# rbm testing   
@app.route("/rbm/user/<userID>", methods=['GET'])
def RbmRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/RBM.pkl')
    recs = BakeOff.TestRBMModel(algo, userID)
    return jsonify({'eventIds': recs})

# auto rec testing
@app.route("/autorec/user/<userID>", methods=['GET'])
def AutoRecRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/AutoRec.pkl')
    recs = BakeOff.TestAutoRecModel(algo, userID) 
    return jsonify({'eventIds': recs})

# adding rating single  row to dataset
@app.route("/rating/add",methods=['POST'])
def addRating():
    eventId = request.form['eventId'] 
    userId = request.form['userId']
    rating = request.form['rating']
    print(userId," ",eventId," ",rating)
    status = addRate(userId, eventId, rating)
    return jsonify({'status': status})

# adding rating multiple row to dataset
@app.route("/rating/add/multiple",methods=['POST'])
def addManyRating():
    eventIds = request.form['eventIds'] 
    userIds = request.form['userIds']
    ratings = request.form['ratings']
    print(userIds," ",eventIds," ",ratings)
    addManyRate(userIds, eventIds, ratings)
    return "done"

    
# Running the server in localhost:5000    
if __name__ == '__main__':
   app.run(debug=True)
    
   

    
    



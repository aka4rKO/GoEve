# -*- coding: utf-8 -*-
"""
Created on Sat April 20 2019

@author: Akram Azarm and Amjad
"""

import surprise
from Framework.EventData import EventData
from Framework.Evaluator import Evaluator
from flask import Flask, request, jsonify

import SimpleUserCF
import SimpleItemCF
import KNNBakeOff
import SVDBakeOff
import RBMBakeOff
import AutoRecBakeOff
import BakeOff
import CateRec
from dataset.AddRating import addRate
from dataset.AddRating import addManyRate
import BuildModels
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler



app = Flask(__name__)
CORS(app)


def trainNow():
     trainColl()
     BakeOff.TrainModel()

sched = BackgroundScheduler(daemon=True)
sched.add_job(trainNow,'interval',seconds=86400)
sched.start()

def LoadEventData():
    event = EventData()
    print("Loading event ratings...")
    data = event.loadEventData()
    print("\nComputing event popularity ranks so we can measure novelty later...")
    rankings = event.getPopularityRanks()
    return (event, data, rankings)



# GET requests which will return eventIds of the recommended events
@app.route('/contentrecs/user/<userID>', methods=['GET'])
def getContentKNNRecs(userID):
    (event, evaluationData, rankings) = LoadEventData()
    (predictions, contentKNN) = surprise.dump.load('models/contentKnn.pkl')
    recs = contentKNN.SampleTopNRecs(event, userID)
    print(recs)
    return jsonify({'eventIds': recs})

@app.route('/usercf/user/<userID>', methods=['GET'])  
def getUserCF(userID):
    (predictions, userCF) = surprise.dump.load('models/userCf.pkl')
    recs = SimpleUserCF.SampleTopNRecs(userID, userCF)
    print(recs)
    return jsonify({'eventIds': recs})

@app.route('/itemcf/user/<userID>', methods=['GET']) 
def getItemCF(userID):
    (predictions, itemCF) = surprise.dump.load('models/itemCf.pkl')
    recs = SimpleItemCF.SampleTopNRecs(userID, itemCF)
    print(recs) 
    return jsonify({'eventIds': recs})

@app.route('/userknn/user/<userID>', methods=['GET'])
def getUserKNN(userID):
    recs = KNNBakeOff.knn(userID, True)
    print(recs) 
    return jsonify({'eventIds': recs})

@app.route('/svd/user/<userID>', methods=['GET'])  
def getSVD(userID):
    recs = SVDBakeOff.svdAndSvdPp(userID, 'svd', True)
    print(recs) 
    return jsonify({'eventIds': recs})

@app.route('/svdpp/user/<userID>', methods=['GET'])
def getSVDpp(userID):
    recs = SVDBakeOff.svdAndSvdPp(userID, 'svdpp', True)
    print(recs) 
    return jsonify({'eventIds': recs})


# train arko models
@app.route("/other/train", methods=['GET'])
def trainColl():
   BuildModels.buildModels()
   return "Done"

# train the model 
# trainning rbm
@app.route("/rbm/train", methods=['GET'])
def trainRbm():
    RBMBakeOff.TrainModel()
    return "Done"

# train all autorec and rbm
@app.route("/train/all", methods=['GET'])
def trainAll():
    trainColl()
    BakeOff.TrainModel()
    return "Done"
    
# rbm testing   
@app.route("/rbm/user/<userID>", methods=['GET'])
def RbmRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/RBM.pkl')
    recs = BakeOff.TestRBMModel(algo, userID)
    return jsonify({'eventIds': recs})

# trainning auto rec
@app.route("/autorec/train", methods=['GET'])
def trainAutoRec():
    AutoRecBakeOff.TrainModel()
    return "Done"

# auto rec testing
@app.route("/autorec/user/<userID>", methods=['GET'])
def AutoRecRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/AutoRec.pkl')
    recs = BakeOff.TestAutoRecModel(algo, userID) 
    return jsonify({'eventIds': recs})

# adding a single rating row to dataset
@app.route("/rating/add",methods=['POST'])
def addRating():
    eventId = request.form['eventId'] 
    userId = request.form['userId']
    rating = request.form['rating']
    print(userId," ",eventId," ",rating)
    addRate(userId, eventId, rating)
    
    return "Done"

# adding rating multiple row to dataset
@app.route("/rating/add/multiple",methods=['POST'])
def addManyRating():
    eventIds = request.form['eventIds'] 
    userIds = request.form['userIds']
    ratings = request.form['ratings']
    print(userIds," ",eventIds," ",ratings)
    addManyRate(userIds, eventIds, ratings)
    return "Done"

@app.route("/newuser",methods=['POST'])
def newUser():
    categories = request.form['categories']   
    catList = categories.split('|')
    
    recs = CateRec.SampleTopNRecs(catList)
    print(recs)
    return jsonify({'eventIds': recs})
    

# Running the server in localhost:5000    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    #app.run(debug=True)



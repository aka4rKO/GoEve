# -*- coding: utf-8 -*-
"""
Created on Sat April 20 2019

@author: Akram Azarm
"""

import surprise
from Framework.EventData import EventData
from flask import Flask, request, jsonify

import SimpleUserCF
import SimpleItemCF
import KNNBakeOff
import SVDBakeOff
import RBMBakeOff
import AutoRecBakeOff
from dataset.AddRating import addRate
from dataset.AddRating import addManyRate
import BuildModels



app = Flask(__name__)


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

# TODO
    # make a common call to train the models /train method POST 
    # append the ratings to the ratings.csv file -> train and build models
    # after training the models evaluate them and compare those scores before dumping 
    # for top recommended combine all and see the best result after evaluating and send
    
    # make new Algo for new users /newuser/data method POST
    # database must have a field called first time and rated
    
    
    # Recommended
    # Based on your interest
    # Based on other user who have been to similar events

# train arko models
@app.route("/other/train")
def trainColl():
   BuildModels.buildModels()
   return "Done"

# train the model 
# trainning rbm
@app.route("/rbm/train", methods=['GET'])
def trainRbm():
    RBMBakeOff.TrainModel()
    return "Done"

# rbm testing   
@app.route("/rbm/user/<userID>", methods=['GET'])
def RbmRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/RBM.pkl')
    recs = RBMBakeOff.TestModel(algo, userID)
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
    recs = AutoRecBakeOff.TestModel(algo, userID) 
    return jsonify({'eventIds': recs})

# adding a single rating row to dataset
@app.route("/rating/add",methods=['POST'])
def addRating():
    eventId = request.form['eventId'] 
    userId = request.form['userId']
    rating = request.form['rating']
    print(userId," ",eventId," ",rating)
    addRate(userId, eventId, rating)
    
    return "done"

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



# -*- coding: utf-8 -*-
"""
Created on Sat April 20 2019

@author: Akram Azarm
"""

import surprise
from Framework.EventData import EventData
from flask import Flask, jsonify

import SimpleUserCF
import SimpleItemCF
import KNNBakeOff
import SVDBakeOff



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

# Running the server in localhost:5000    
if __name__ == '__main__':
    app.run(debug=True)



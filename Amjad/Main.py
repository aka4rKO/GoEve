# -*- coding: utf-8 -*-
"""
Created on Mon Apr 29 17:58:33 2019

@author: Amjad
"""

from flask import Flask, request, jsonify
import RBMBakeOff
import AutoRecBakeOff
import surprise
from dataset.AddRating import addRate
#from RBMBakeOff import TrainModel

app = Flask(__name__)
print(app)

# test api
@app.route("/")
def home():
    return "Hello World"

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

# test model
    
# rbm testing   
@app.route("/rbm/user/<userID>", methods=['GET'])
def RbmRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/RBM.pkl')
    recs = RBMBakeOff.TestModel(algo, userID)
    return jsonify({'eventIds': recs})

# auto rec testing
@app.route("/autorec/user/<userID>", methods=['GET'])
def AutoRecRecommendation(userID):
    (predictions, algo) = surprise.dump.load('models/AutoRec.pkl')
    recs = AutoRecBakeOff.TestModel(algo, userID) 
    return jsonify({'eventIds': recs})

# adding rating row to dataset
@app.route("/rating/add",methods=['POST'])
def addRating():
    eventId = request.form['eventId'] 
    userId = request.form['userId']
    rating = request.form['rating']
    print(userId," ",eventId," ",rating)
    addRate(userId, eventId, rating)
    
    return "done"
    
# Running the server in localhost:5000    
if __name__ == '__main__':
    app.run(debug=True)
    
    
    



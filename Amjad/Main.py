# -*- coding: utf-8 -*-
"""
Created on Mon Apr 29 17:58:33 2019

@author: Amjad
"""

from flask import Flask, request, jsonify
import RBMBakeOff
import surprise
from dataset.AddRating import addRate
#from RBMBakeOff import TrainModel

app = Flask(__name__)
print(app)

# test apo
@app.route("/")
def home():
    return "Hello World"

# train the model 
@app.route("/rbm/train")
def train():
#    TrainModel()
    RBMBakeOff.TrainModel()
    return "Done"

@app.route("/rbm/user/<userID>")
def recommendation(userID):
    (predictions, algo) = surprise.dump.load('models/RBM.pkl')
    recs = RBMBakeOff.TestModel(algo,userID)
    return jsonify({'eventIds': recs})

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
    
    
    



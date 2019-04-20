# -*- coding: utf-8 -*-
"""
Created on Sat April 20 2019

@author: Akram Azarm
"""

import SimpleUserCF
import SimpleItemCF
import ContentRecs
import KNNBakeOff
import RecsBakeOff
import SVDBakeOff

SimpleUserCF.simpleUserCF('3247')

SimpleItemCF.simpleItemCF('3247')

ContentRecs.contentRecs('3100')

KNNBakeOff.knn('3120')

RecsBakeOff.recsBakeOffEval()

SVDBakeOff.svdAndSvdPp('3222')








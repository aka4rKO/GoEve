import React, { Component } from 'react';
import {
        View,
        Text,
        CheckBox,
        // import { TouchableOpacity } from 'react-native-gesture-handler';
        Image,
        ScrollView,
        StyleSheet,
        Touchable, 
        Header,
        Button, 
        TouchableOpacity,
        FlatList
        } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';

       

export class InterestsCards extends Component {

    constructor(props){
        super(props);

    }



    render() {
       

      
      const {types} = this.props;
        let typesList = [];
        types.forEach((typer,i) => {


            checkBoxCheck = () => {
                
                 b = typer.type.id;

                //  status=!typer.type.status
                
    
                 alert(b);
                
            }   
    
            const typeArray = (

                           
            
                        <View key={`type${i}`} style={{flex: 2}}>
                        
                        <View key={typer.type.id}>
                    

                         
                        <TouchableOpacity>
   
                            <CheckBox
                                 value={typer.type.status} 
                                 onChange={()=>checkBoxCheck.bind(i)}
                                //onChange={this.props.CheckBoxTest}
                                style={{height:100,width:200,position:'absolute'}}
                            />
                            <Image
                                source={typer.type.url}
                                resizeMode={'contain'}
                                style={{height:100,width:200}}
                            />
                           
                            
                            </TouchableOpacity>
                        
                            
                        </View>
                     </View>
                
                

                     

                    
                    

                        /* <View key={`type${i}`} style={{flex: 2}} >
                         <Text>{typer.type.name}</Text>
                         <View key={typer.type.id}> 
                             <TouchableOpacity>
                             <CheckBox 
                                 style={{height:100,width:200,position:'absolute'}}
                             />
                             <Image
                                 source={typer.type.url}
                                 resizeMode={'contain'}
                                 style={{height:100,width:200}}
                             />
                             </TouchableOpacity>
                         </View>
                     </View>    */
                    
                     

                                  

            )

                

        

            typesList.push(
                
                
                typeArray
                

               
                )
            

            


         });


        



         
         
        if(typesList.length > 0){
            return (
                
            <ScrollView>

        

        <View   style={styles.header} >
        <Text style={styles.headerText}>Choose Interest</Text>
        
        <View style = {styles.btn} >
        <Button
        
            title="DONE"
        />
        </View>
        </View>

        <View>
             <Text style={styles.headerText}> Choose at least 3 topics to setup your feed</Text>
        </View>


                {typesList}
            </ScrollView>
            )
        }
        return(
       
            
            <Text>Empty</Text>
        )


      
    }
}


  const styles = StyleSheet.create({
        
         
            
             header: {
                backgroundColor: '#FF4500',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60
            },

            headerText: {
                color:'black',
                fontSize: 20,
                padding: 26,
                fontWeight: 'bold',
                alignItems: 'center'
            },

            btn: {    
                position: 'absolute',
                right: 10,
                top: 15,
                backgroundColor: '#FF4500',        
                color: 'red'
            },

            cb: {
                height: 100,
                width: 200,
                position: 'absolute',
            },
            userStyle:{
                fontSize:18,
                color:'black',
                fontWeight:'bold',
                textAlign: 'center',
                position: 'absolute'
                
            }

            // imagee: {
            //     flex:1,
            //     flexDirection: 'row'
            // }



        });

export default InterestsCards;

// import React from 'react'
// import InterestsCards from 'InterestsCards'

// export default class Interests extends React.Component {
//   render() {

//     return (
      
//     )
//   }
// }

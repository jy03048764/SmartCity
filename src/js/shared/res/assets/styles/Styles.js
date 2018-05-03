//add this just after imports: var Strings = require('path-to/StringsEN');
//then can reference as Strings.CONSTANT_NAME_IN_ALL_CAPS

import {Dimensions, Platform} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const resizeMode = 'center';
const platform = Platform.OS;
if(Platform.OS == 'ios'){
    taskbarPadding = 0 ;
    contentFontWeight = '600';

}
if(Platform.OS == 'android'){
    taskbarPadding = deviceHeight * 0.1;
    contentFontWeight = '400';
}

module.exports = {

    theme: {
        primaryColor: "#1c4888", //primary color
        primaryLight: "#5473b8",    //primary light
        secondaryColor: "#059980", //secondary color
        secondaryDark: "#006a54",  //secondary dark
        secondaryLight: "#53cbaf", //secondary light
        brandDark: "#222",
        brandLight: "#f4f4f4",
    },
    header:{
        header:{
            width: deviceWidth,
            borderBottomWidth: 0,
            elevation: 0
        },
        left:{
            flex:.9
        },
        title:platform === "ios" ? 0 : {
            alignSelf:'center',
            flex:3,
            paddingTop:15,
            marginLeft:deviceWidth*0.03,
        },
        right:{
            flex:.9
        },
        text:{
            color:"#f4f4f4",
            fontWeight: platform === "ios" ? '600' : '400',
        }
    },
    footer:{
        icon:{
            fontSize:35 ,
            marginTop:0,
            paddingBottom:0
        }
    },
    keyboardView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        input: {
            width: deviceWidth * .8,
            flexDirection: 'row',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            marginBottom: 10,
            alignItems: 'center'

        },
        profileLabelText: {
            color: "#1c4888",
            marginLeft: deviceWidth * .09
        },
        input2: {
            marginBottom: deviceHeight * .03
        }
    },
    button: {
        loginButton: {
            button: {
                flex: 0,
                padding: 0,
                margin: 0,
                width: deviceWidth * .9,
                height: 56,
                borderRadius: 12,
                marginBottom: 6,
                marginTop: 6,
            },
            phoneButton:{
                flex: 0,
                padding: 0,
                margin: 0,
                width: deviceWidth * .9,
                height: 56,
                borderRadius: 12,
                marginBottom: 6,
                marginTop: 6,
                justifyContent:'center'
            },
            textFacebook: {
                flexWrap: 'wrap',
                paddingLeft: 6,
                marginRight: platform === "ios" ? deviceWidth * .13 : deviceWidth * .1,
                width: platform === "ios" ? deviceWidth * .7 : deviceWidth * .7,
                fontSize: 20,
                textAlign:platform === "ios" ? 'center' : 'center',
                color: '#eee',
                fontWeight: platform === "ios" ? '600' : '400'
            },
            textPhone: {
                flexWrap: 'wrap',
                paddingLeft: 6,
                //marginRight: deviceWidth * .15,
                width: deviceWidth * .6,
                fontSize: 20,
                textAlign:'center',
                color: '#5473b8',
                fontWeight: platform === "ios" ? '600' : '400'

            },
            iconPhone: {
                //right: -deviceWidth * .33,
                // width:dimension*.4,
                marginRight: 0,
                marginLeft: 0,
                paddingLeft:deviceWidth*.05,
                fontSize: 35,
                textAlign: 'right',
                color: '#5473b8'
            },
            iconFacebook: {
                //right: -deviceWidth * .33,
                // width:dimension*.4,
                marginRight: 0,
                marginLeft: 0,
                paddingLeft:deviceWidth*.05,
                fontSize: 35,
                textAlign: 'right',
                color: '#eee'
            },

        },
        loginBackButton: {
            icon: {
                marginRight: 2
            },
            text: {
                paddingLeft: 5
            },
            button: {
                marginTop: deviceHeight * 0.025
            }

        },
        logout:{
            button:{
                width:deviceWidth*0.8,
                backgroundColor:"#ED0000",
                alignSelf:'center',
                marginTop:20,
                justifyContent:'center'
            },
            text:{
                //alignSelf:'center'
                fontSize: platform === "ios" ? 20 : 16,
                paddingBottom:platform === "ios" ? 0 : 3,
            }

        },


        loginButton2: {

            paddingTop: deviceHeight * .15,
            paddingBottom: platform === "ios" ? 0 : taskbarPadding,

            width: deviceWidth * .9,
            justifyContent: 'center'
        },
        verificationResend: {
            paddingTop: deviceHeight * .15,
            width: deviceWidth * .9,
            alignSelf: 'center'
        }

    },
    line: {
        //width: deviceWidth * .4,
        flex:3,
        borderBottomWidth: 1.2,
        borderColor: '#eee',
        //backgroundColor: '#eee'
    },
    lineBox:{
        flex:1,
        flexDirection:'row',
        marginTop: 10,
        marginBottom:10,
        height:25
    },
    lineText:{
        height:25,
        flex:1,
        fontSize:18,
        backgroundColor: 'rgba(0,0,0,0)',
        color:'#eee',
        textAlign:'center',
        alignSelf:'center'
    },
    text: {
        loginH1:{
            fontSize: 32,
            fontWeight: 'bold',
            paddingBottom: deviceHeight * .06,
            color: '#eee',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        h1: {
            fontSize: 24,
            fontWeight: 'bold',
            paddingBottom: deviceHeight * .01,
            color: '#eee',
            backgroundColor: 'rgba(0,0,0,0)',
        },
        h2: {
            fontSize: 16,
            paddingBottom: 5,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#eee',
            backgroundColor: 'rgba(0,0,0,0)',
            width: deviceWidth * 0.8
        },
        textWhite:{
            color:'#f4f4f4'
        },
        content:{
            fontSize:16
        },
        loginText: {
            already: {
                flexWrap: 'wrap',
                paddingRight: 3,
                fontSize: 16,
                color: '#eee',
                textAlign: 'right'

            },
            login: {
                flexWrap: 'wrap',
                paddingLeft: 3,
                fontSize: 16,
                color: '#eee',
                textDecorationLine: 'underline'
            },

        },
        input: {
            backgroundColor: 'blue',
            marginBottom: 10
        }

    },
    image: {
        loginBackgroundImage: {
            flex: 1,
            width: deviceWidth,
            height: deviceHeight,
            justifyContent:'center',
            alignItems:'center'
        },
        icon: {
            width: deviceWidth * .5,
            height: deviceHeight * .3,
            paddingBottom: 6
        },
    },
    map: {
        mapModal: {

            icon:{
                fontSize:20,
                flex:2,
                marginRight:0,
                paddingRight:5,
                textAlign:'right'
            },
            follow:{
                flex:3,
                paddingLeft:5,
            },

            thumbnail: {
                marginLeft: deviceWidth * .035,
                marginTop:10
            },
            textView: {
                width:0,
                flexGrow:1,
                marginLeft: 10,
                paddingTop:8,
                marginTop: platform === "ios" ? 0 : 0,
                flexDirection: 'column',



            },
            buttons: {
                moreInfo: {
                    backgroundColor: '#5473b8',
                    height: 40,
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 4,
                },
                plusOne: {
                    backgroundColor: '#059980',
                    height: 40,
                    flex: 1,
                    marginLeft: 4,
                    marginRight: 4,
                },
                text:{
                    fontWeight: platform === "ios" ? '600' : '400',
                },
                backButton:{
                    color:'#f4f4f4',
                    textShadowColor: '#444',
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    textShadowOffset:{width: 1,height: 1}
                }
            },
            text:{
                title:{
                    fontSize:22,
                    fontWeight: platform === "ios" ? '600' : '400',




                },
                note:{
                    fontWeight: platform === "ios" ? '600' : '400',
                    color:'#222',
                    //paddingBottom:platform === "ios" ? 0 : 20
                    flexWrap:'wrap',

                }
            }

        },
        detailModal:{
            backButton:{
                position:'absolute',
                top:8,
                left:0
            },
            infoView:{
                backgroundColor:'#1c4888',
                height:80,
                marginBottom:10,
                justifyContent:'center',
                paddingLeft:deviceWidth * 0.05,

            },
            image:{
                height: 250,
                resizeMode: 'contain',
                top:0,
                left:0,
                width: deviceWidth,
            },
            plusOne:{
                backgroundColor: '#059980',
                width: deviceWidth * .95,
                marginTop:6,
                marginBottom: 10,
                alignSelf:'center',
                justifyContent:'center'
            },
            detailView:{
                justifyContent:'center',
                paddingLeft:deviceWidth * 0.05,
                paddingRight:deviceHeight *0.03
            },
            text:{

                header:{
                    color:'#f4f4f4',
                    fontSize: platform === "ios" ? 18 : 18,
                    marginBottom:4,
                    fontWeight: platform === "ios" ? '600' : '400',

                },
                note:{
                    color: '#f4f4f4',
                    fontSize: platform === "ios" ? 14 : 12,
                    fontWeight: platform === "ios" ? '500' : '400',
                },
                infoNote:{
                    color: platform === "ios" ? '#059980': "#059980",
                    marginBottom: platform === "ios" ? 8 : 8,
                    fontWeight: platform === "ios" ? '600' : '400'
                },
                info:{
                    color: platform === "ios" ? '#222' : '#222',
                    marginBottom:16,
                    // fontWeight: contentFontWeight
                    fontWeight: platform === "ios" ? '600' : '400'
                }

            },
            line:{
                width:deviceWidth *.9,
                marginBottom:8
            }

        }
    },
    profileFields:{

        line:{
            width:deviceWidth *0.9,
            borderBottomWidth: .95,
            borderColor: '#bbb'

        },
        textFields:{
            marginLeft: 16,
            marginRight:16,
            marginTop: 30,

        },
        nameTextField:{
            color: "#006a54",
            fontWeight: "bold",
            fontSize: 20,
        },
        phoneNumberText:{
            marginTop: 45,
            color:"#059980",
            fontSize: 14,
        },
        subContentField:{
            color:'#222',
            marginTop: 5,
            marginBottom: 10,
            fontSize: 16,
            fontWeight:'600'
        },
        subTitleField:{
            marginTop: 10,
            color:"#059980",
            fontSize: 14,
        },
        addressSubField:{
            color:'#222',
            fontSize: platform === 'ios' ? 16 : 16,
            fontWeight: platform === 'ios' ? '600' : '400'
        },
    },
    cameraWarning:{
        textFieldTitle:{
            textAlign: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 5,
            fontWeight: 'bold',
            justifyContent:'center',
            fontSize: 24,
        },
        textField:{
            textAlign: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 15,
            fontSize: 15,
            flexWrap:'wrap'
        },
        buttonField:{
            alignSelf: 'center',
            backgroundColor: '#059980',
            width: deviceWidth/1.25,
        },
        buttonText:{
            textAlign: 'center',
            justifyContent:'center',
            flex: 1,
        },
        centerView:{
            flex: 1,
            width: deviceWidth,
            height: deviceHeight/1.25,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    aboutContent:{
        backgroundImage:{
            flex: 1,
            //position:'absolute',
            //top:0,
            //left:0,
            width: deviceWidth *1.1,
            height: deviceHeight *1.3,
            resizeMode: 'contain',
            marginTop:- deviceHeight*.175,
            alignSelf:'center',
            //backgroundColor: 'rgba(0,0,0,0.1)'
            opacity: 0.09

        },
        aboutView:{
            backgroundColor:'transparent',
            position:'absolute',
            top:20,
            marginLeft: deviceWidth * 0.04


        },
        aboutAppTitle:{
            color:'#006a54',
            fontSize: 18,
            fontWeight: 'bold',
        },
        versionAbout:{
            color:'#006a54',
            marginTop: 2,
            //fontSize: 12,
            fontWeight:'600'
        },
        aboutDescription:{
            fontSize: 14,
            width: deviceWidth * 0.9,
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 20,
            fontWeight: '600'
        },
        contactInfoTitle:{
            //fontSize: 12,
            color:'#006a54',
            fontWeight: 'bold',
        },
        nameTitle:{
            fontSize: 16,
            marginBottom: 2,
            marginTop: 6,
            color: '#059980',
        },
        emailTitle:{
            fontSize: 18,
            marginBottom: 10,
            fontWeight:'600'
        },
        line:{
            marginBottom:3,
            borderBottomWidth:1.2
        },
        lastLine:{
            paddingBottom: taskbarPadding
        }

    },
    profileEditModal:{
        firstNameField:{
            marginLeft: 16,
        },
   
        lastNameField:{
            marginLeft: 16,
            marginBottom: 20,
        },

        phoneField:{
            marginLeft: 16,
        },

        emailField:{
            marginLeft: 16,
            marginBottom: 20,
        },

        addressLineField:{
            marginLeft: 16,
        },

        addressLineSubField:{
            marginLeft: 16,
        },
    },
    feedbackContent:{
        view:{
            width: deviceWidth * 0.8,
            alignSelf:'center',
            marginTop: deviceHeight * 0.05,


        },
        input:{
            fontSize: 18,
            margin: 16,
            height: 300,
            width:deviceWidth*0.7,
            textAlignVertical: platform === "ios" ? 0 : "top"


           // borderBottomWidth:3
        },
        submitButton:{
            alignSelf: 'center',
            backgroundColor: '#059980',
            width: deviceWidth *0.8,
            marginTop: deviceHeight * 0.05
        },
        submitButtonText:{
            textAlign: 'center',
            justifyContent:'center',
            flex: 1,
        },
    },
    requests:{
        note:{
            color:'#059980',
            fontWeight: contentFontWeight
        },
        text:{
            color:'#222',
            fontWeight: contentFontWeight,
            marginBottom:5
        },
        icon:{
            color:'#53cbaf'
        },
        submitButton:{
            width: deviceWidth * 0.5,
            alignSelf:'center',
            backgroundColor: '#53cbaf',
            justifyContent:'center'
        }
    },
    segment:{
        box:{
            lineHeight:2
        },
        button:{
            width:deviceWidth*.3,
            justifyContent: 'center',
            alignItems:'center'
        },
        text:{
            fontSize: platform === "ios" ? 14 : 12,
            fontWeight: platform === "ios" ? 'bold' : 'normal',
            width: deviceWidth*.3,
            //alignSelf:'center',
            textAlign:'center',
            paddingLeft:0,
            paddingRight:0,
            paddingBottom: platform === "ios" ? 0 : 6
        }
    },
    details:{
        pickerField:{
            width:deviceWidth,
            borderRadius:0,
            //backgroundColor:'#eee'
        },
        textInput:{
            width:deviceWidth,
            height:125,
            fontSize: platform === "ios" ? 16 : 14,
            paddingLeft:deviceWidth*0.04,
            paddingRight:deviceWidth*0.04,
            textAlignVertical: platform === "ios" ? 0 : "top"
        }
    },
    shadow:{
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // iOS
        shadowOffset: {
            width: 0,            // These can't both be 0
            height: 1,           // i.e. the shadow has to be offset in some way
        },
        // Android
        shadowOffset: {
            width: 0,            // Same rules apply from above
            height: 1,           // Can't both be 0
        },
    }
      
    };


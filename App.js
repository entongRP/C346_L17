import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image} from 'react-native';

//1C
let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    //add effect 1B
    useEffect(() => {
        //add fetch 1A
        const myurl = "https://onlinecardappwebservice-09rt.onrender.com/allcards"
        fetch(myurl)
            .then ((response)=> {
                return response.json();
            })
            .then( (myJson)=> {
                setMyData(myJson);
                originalData = myJson;
            })
    }, [])


    const FilterData = (text) => {
        if (text!=''){
            let myFilterData = originalData.filter((item)=> item.card_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilterData);
        } else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Text style={{fontWeight:'bold'}}>{item.card_name}</Text>
                <Image
                    source={{ uri: item.card_pic }}
                    style={{
                        width: 100,
                        height: 150,
                        borderWidth: 1,
                        borderRadius: 8,
                        marginVertical: 6,
                        marginStart: 40
                    }}
                />
            </View>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Text>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=> {FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;

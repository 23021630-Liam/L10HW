import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=top100rocksongsbillboard2013&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            });
    });

    const FilterData = (text) => {
        if (text !== '') {
            const myFilteredData = originalData.filter(
                (item) =>
                    item.Song.toLowerCase().includes(text.toLowerCase()),
                    item.Performer.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.Song}</Text>
                <Text style={styles.subText}>- {item.Performer}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>Rock Songs Search</Text>
            <TextInput
                style={styles.input}
                placeholder="Search songs or artists..."
                onChangeText={(text) => {
                    FilterData(text);
                }}
            />
            <FlatList
                data={myData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} // Use index as key
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#e0f7fa',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00796b',
    },
    subText: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});

export default App;

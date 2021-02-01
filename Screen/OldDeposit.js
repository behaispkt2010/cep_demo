import React, {useState, useEffect} from "react";
import {
	View, 
	Text, 
	SafeAreaView, 
	StyleSheet, 
	Dimensions, 
	TouchableOpacity, 
	TouchableHighlight, 
	Image, 
	ImageBackground, 
	Alert, 
	FlatList
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import NumberFormat from 'react-number-format';
import Loader from '../Components/Loader';
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";

let {width, height} = Dimensions.get('window');
let box_count = 7;
let box_width = (width - 32) / box_count;
const bgImage = require('../Image/canh.jpg');

const OldDeposit = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const isFocused = useIsFocused();

	const dataList = [
		{	id: 1,
			name: "Vay đợt 1/2018",
			dept: '5.000.000',
			datestart: '01/05/2020',
		},
		{	id: 2,
			name: "Vay đợt 5/2019",
			dept: '15.000.000',
			datestart: '15/12/2020',
		},

	]

	const Item = ({ data }) => (
		<View style={styles.item}>
			<View>
				<Text style={styles.box_content}>{data.name}</Text>
			</View>
			<View>
				<View style={styles.box}>
					<View style={styles.info_detail}>
					    <View style={styles.detail}>
				    		<Text style={styles.detail_content}>Tổng số tiền: {data.dept} VND</Text>
				    		<Text style={styles.detail_content}>Ngày bắt đầu vay: {data.datestart}</Text>
				    	</View>
					</View>
				</View>
				<View style={styles.func}>
			    	<TouchableHighlight>
			    		<View style={[styles.button, styles.btnInfo]}>
				          	<Text style={styles.textbtn}>
				          		<MaterialIcons name="info" size={24} color="white" />
				          	</Text>
				        </View>
			    	</TouchableHighlight>
		    	</View>
			</View>
		</View>
	);
	const renderItem = ({ item }) => (
    	<Item data={item} />
  	);

	return(
		<ImageBackground source={bgImage} style={styles.imageBg}>
			<View style={styles.container}>
				<FlatList
			        data={dataList}
			        renderItem={renderItem}
			        keyExtractor={item => item.id.toString()}
		      	/>	
		      	<View style={styles.func}>
			      	<TouchableHighlight onPress={() => navigation.navigate("Home")}>
			    		<View style={[styles.button, styles.btnDefault, styles.btnTotal]}>
			    			<MaterialIcons name="home" size={24} color="white" />
				          	<Text style={styles.textBtnTotal}>
				          		Về trang chủ
				          	</Text>
				        </View>
			    	</TouchableHighlight>
		    	</View>
            </View>
		</ImageBackground>
	)
};


export default OldDeposit;

const styles = StyleSheet.create({
    imageBg: {
    	flex: 1,
        resizeMode: 'cover',
    },
    container: {
    	flex: 1,
        flexDirection: 'column',
    },
    box_content: {
        padding: 3,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        color: 'red',
    },
    item: {
    	flexDirection: 'column', 
        justifyContent: 'flex-start',
        backgroundColor: "#7a7a7a80",
        paddingTop: 10,
        marginBottom: 15
    },
    box: {
    	flexDirection: 'row', 
        justifyContent: 'flex-start',
        height: box_width,
        width: width,
        textAlign: 'center',
        marginBottom: 20
    },
    detail: {
  		paddingLeft: 20,
  	},
  	detail_content: {
  		fontSize: 17,
  		color: "#fff"
  	},
  	info_detail: {
  		flexDirection: 'column', 
        justifyContent: 'flex-start',
  	},
  	func: {
  		flexDirection: 'row', 
        justifyContent: 'center',
        marginBottom: 10
  	},
  	button: {
	    alignItems: "center",
	    backgroundColor: "red",
	    padding: 10,
	    borderRadius: 5,
	    backgroundColor: '#7a7a7a80'
  	},
  	btnInfo: {
  		backgroundColor: '#17a2b8'
  	},
  	textbtn: {
  		color: "#fff"
  	},
  	btnTotal: {
  		height: 60,
  		flexDirection: 'row'
  	},
  	textBtnTotal: {
  		fontSize: 16,
  		color: '#fff',
  	}
});
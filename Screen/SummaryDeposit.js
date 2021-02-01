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
let box_count = 3;
let box_width = (width - 32) / box_count;
const bgImage = require('../Image/women.jpg');

const SummaryDeposit = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const isFocused = useIsFocused();

	const dataList = [
		{	id: 1,
			name: "Khoản vay 1",
			dept: '5.000.000',
			datestart: '01/05/2020',
			next_pay_date: '01/02/2021',
			next_pay_money: '1.000.000',
			late_money: '300.000',
		},
		{	id: 2,
			name: "Khoản vay 2",
			dept: '15.000.000',
			datestart: '15/12/2020',
			next_pay_date: '15/03/2021',
			next_pay_money: '2.400.000',
			late_money: '900.000',
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
				    		<View style={styles.viewDetail}><Text style={styles.detail_content}>Tổng dư nợ: {data.dept} VND</Text></View>
				    		<View style={styles.viewDetail}><Text style={styles.detail_content}>Ngày bắt đầu vay: {data.datestart}</Text></View>
				    		<View style={styles.viewDetail}><Text style={styles.detail_content}>Hạn thanh toán tiếp theo: {data.next_pay_date}</Text></View>
				    		<View style={styles.viewDetail}><Text style={styles.detail_content}>Số tiền thanh toán tiếp theo: {data.next_pay_money} VND</Text></View>
				    		<View style={styles.viewDetail}><Text style={styles.detail_content}>Số tiền quá hạn: {data.late_money} VND</Text></View>
				    	</View>
					</View>
				</View>
				<View style={styles.func}>
			    	<TouchableHighlight onPress={() => Alert.alert('Chi tiết khoản vay')}>
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
			      	<TouchableHighlight onPress={() => navigation.navigate("OldDeposit")}>
			    		<View style={[styles.button, styles.btnPrimary, styles.btnTotal]}>
				          	<Text style={styles.textBtnTotal}>
				          		Xem khoản vay trước
				          	</Text>
				        </View>
			    	</TouchableHighlight>
			    	<Text> </Text>
			      	<TouchableHighlight onPress={() => navigation.navigate("RenewDeposit")}>
			    		<View style={[styles.button, styles.btnSuccess, styles.btnTotal]}>
				          	<Text style={styles.textBtnTotal}>
				          		Đăng ký khoản vay mới
				          	</Text>
				        </View>
			    	</TouchableHighlight>
		    	</View>
            </View>
		</ImageBackground>
	)
};


export default SummaryDeposit;

const styles = StyleSheet.create({
    imageBg: {
    	flex: 1,
        resizeMode: 'cover',
        opacity: 0.9
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
	    borderRadius: 5
  	},
  	btnInfo: {
  		backgroundColor: '#17a2b8'
  	},
  	textbtn: {
  		color: "#fff"
  	},
  	btnPrimary: {
  		backgroundColor: '#0095ff'
  	},
  	btnSuccess: {
  		backgroundColor: '#28a745'
  	},
  	btnTotal: {
  		height: 60
  	},
  	textBtnTotal: {
  		fontSize: 16,
  		color: '#fff',
  		paddingTop: 10
  	},
  	viewDetail: {
  		paddingTop: 5
  	}
});
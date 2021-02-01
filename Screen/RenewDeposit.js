import React, {useState, useEffect, useReducer} from "react";
import {
	View, 
	Text, 
	TextInput, 
	SafeAreaView, 
	StyleSheet, 
	Dimensions, 
	TouchableOpacity, 
	TouchableHighlight, 
	Image, 
	ImageBackground, 
	Alert, 
    Keyboard, 
    Platform, 
	FlatList
} from "react-native";
import { MaterialIcons, Fontisto } from '@expo/vector-icons'; 
import NumberFormat from 'react-number-format';
import Loader from '../Components/Loader';
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import {CustomInputWithNumFormat} from '../Utils/Common';

let {width, height} = Dimensions.get('window');
let box_count = 4;
let box_width = (width - 32) / box_count;
const bgImage = require('../Image/song.jpg');

const RenewDeposit = ({navigation}) => {
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const isFocused = useIsFocused();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
	const onCloseModal = () => {
        setModalVisible(false);
        Keyboard.dismiss();
    }
    const initialUserInput = {
        amount: '',
        dateloan: date,
    }
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialUserInput
    );
    const [errortext, setErrortext] = useState('');
    const handleChange = (value, name) => {
        let data = {[name]: value}
        setUserInput(data);
    }
    const onChangeDate = (selectedDate) => {
        setDate(selectedDate);
        setUserInput({dateloan: selectedDate});
    }
    const setShowDatepicker = () => {
        setShow(true);
        Keyboard.dismiss();
    }
    const RequestLoan = () => {
        if(userInput.amount != '' && userInput.dateloan != '') {
            const data = {
                message: "Gửi yêu cầu thành công !!!",
                type: "success",
            }
            showMessage(data);
            setUserInput(initialUserInput);
            setDate(new Date());
            setModalVisible(false);
        } else {
            const data = {
                message: "Vui lòng nhập dữ liệu",
                type: "danger",
            }
            showMessage(data);
        }
    }
	return(
		<ImageBackground source={bgImage} style={styles.imageBg}>
			<View style={styles.container}>
				<View>
					<Text style={styles.infoCustomer}>Xác nhận thông tin</Text>
				</View>
				<View style={styles.info}>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Tên khách hàng: Trần Văn An</Text>
                    </View>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Cụm: TTT</Text>
                    </View>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Mã cụm: 1V3</Text>
                    </View>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Số điện thoại: 0969 111 007</Text>
                    </View>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Email: test@gmail.com</Text>
                    </View>
                    <View style={styles.viewDetail}>
					   <Text style={styles.detail}>Nghề nghiệp: Công nhân</Text>
                    </View>
				</View>
				<View style={styles.func}>
			      	<TouchableHighlight onPress={() => setModalVisible(true)}>
			    		<View style={[styles.button, styles.btnPrimary]}>
				          	<Text style={styles.textbtn}>
				          		Xác nhận
				          	</Text>
				        </View>
			    	</TouchableHighlight>
			    	<Text> </Text>
			      	<TouchableHighlight>
			    		<View style={[styles.button, styles.btnSuccess]}>
				          	<Text style={styles.textbtn}>
				          		Cập nhật
				          	</Text>
				        </View>
			    	</TouchableHighlight>
		    	</View>
		    	<View style={styles.centeredView}>
                    <Modal
                        isVisible={modalVisible}
                        animationInTiming={1}
                        deviceWidth={width}
                        onBackdropPress={() => onCloseModal()}
                        backdropColor="#777575"
                        style={{margin: 0}}
                        >
                        <View style={styles.modalView}>
                            <View style={styles.viewModal}>
                                <View style={styles.headerPass}>
                                    <Text>
                                        <TouchableOpacity onPress={() => onCloseModal()}>
                                            <Fontisto name="close-a" size={16} color="black" />
                                        </TouchableOpacity>
                                    </Text>
                                    <Text style={styles.headerModal}>Thông tin vay</Text>
                                    <Text></Text>
                                </View>
                                <View style={styles.input_data}>
                                    <Text style={styles.labelStyle}>Số tiền vay</Text>
                                    <CustomInputWithNumFormat 
                                        dataNumber={userInput.amount} 
                                        keyStore="amount"
                                        handleChange={handleChange}
                                        textHolder="Số tiền"
                                        textStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.input_data}>
                                    <Text style={styles.labelStyle}>Ngày cần khoản vay</Text>
                                    <DatePicker
                                        style={styles.inputStyle}
                                        date={date}
                                        mode="date"
                                        placeholder="select date"
                                        format="LL"
                                        confirmBtnText="Xác nhận"
                                        minDate={date}
                                        cancelBtnText="Hủy"
                                        customStyles={{
                                          dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                          },
                                          dateInput: {
                                            marginLeft: 36,
                                            borderWidth: 0,
                                          }
                                          // ... You can check the source to find the other keys.
                                        }}
                                        onDateChange={(date) => onChangeDate(date)}
                                      />
                                    {/*<TextInput
                                        style={styles.inputStyle}
                                        placeholder="Ngày cần"
                                        placeholderTextColor="#6c757d"
                                        onFocus={() => setShowDatepicker()}
                                        value={userInput.dateloan}
                                    />*/}
                                </View>
                                <View style={styles.func}>
                                    <TouchableOpacity style={[styles.button, styles.btnPrimary]} onPress={() => RequestLoan()}>
                                        <Text style={styles.textbtn}>Yêu cầu tái vay</Text>
                                    </TouchableOpacity>
                                    <Text> </Text>
                                    <TouchableOpacity style={[styles.button, styles.btnWarning]} onPress={() => onCloseModal()}>
                                        <Text style={styles.textbtn}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    
                </View>
			</View>
		</ImageBackground>
	)
}

export default RenewDeposit;

const styles = StyleSheet.create({
    imageBg: {
    	flex: 1,
        resizeMode: 'cover',
    },
    container: {
    	flex: 1,
        flexDirection: 'column',
        backgroundColor: "#7a7a7a80",
    },
    infoCustomer: {
    	color: "#fff",
    	fontSize: 20,
    	textAlign: 'center',
    	textTransform: 'uppercase',
    	fontWeight: "bold",
    	paddingTop: 20
    },
    func: {
  		flexDirection: 'row', 
        justifyContent: 'center',
        marginBottom: 10
  	},
  	button: {
	    alignItems: "center",
	    padding: 10,
	    borderRadius: 5,
        width: 150
  	},
  	btnPrimary: {
  		backgroundColor: '#0095ff'
  	},
  	btnSuccess: {
  		backgroundColor: '#28a745'
  	},
    btnWarning: {
        backgroundColor: '#ffc107'
    },
  	textbtn: {
  		color: "#fff",
  		fontSize: 17,
  		fontWeight: "bold"
  	},
  	detail: {
  		fontSize: 17,
  		color: "#000",
        margin: 10,
        paddingLeft: 5,
  	},
  	info: {
  		paddingLeft: 5
  	},
  	centeredView: {
        flex: 1
    },
    modalView: {
        backgroundColor: "#e4e4e4",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerPass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    viewModal: {

    },
    inputStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        borderColor: '#dadae8',
        backgroundColor: "white",
        fontSize: 17,
        padding: 5,
        width: '100%'
    },
    headerModal: {
        fontSize: 18,
        textTransform: "uppercase",
        padding: 5,
    },
    labelStyle: {
        padding: 5,
        fontSize: 16,
    },
    input_data: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 90,
        width: width
    },
    viewDetail: {
        borderRadius: 5,
        backgroundColor: "#d6d9dc",
        margin: 10
    }
       
});
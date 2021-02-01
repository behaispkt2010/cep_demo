import React from "react";
import NumberFormat from 'react-number-format';
import {
	Text,
	Keyboard,
	TextInput,
} from 'react-native';

export const CustomInputWithNumFormat = ({dataNumber, keyStore, handleChange, textHolder, textStyle}) => {
	return (
		<NumberFormat
            value={dataNumber}
            displayType={'text'}
            allowEmptyFormatting={true}
            thousandSeparator={true}
            renderText={number => (
              	<TextInput
                    style={textStyle}
                    onChangeText={(value) => handleChange(value, keyStore)}
                    placeholder={textHolder}
                    placeholderTextColor="#6c757d"
                    autoCapitalize="none"
                    onSubmitEditing={() =>
                    	Keyboard.dismiss()
                    }
                    keyboardType="number-pad"
                    returnKeyType="next"
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                    value={number}
              	/>
            )}
      	/>
	)
}
export const RemoveSyntax = (data) => {
	let rs = "";
	data = data+'';
	if(data != "" || data != null) {
		if(data.indexOf(",") !== -1) {
			rs = data.replace(/[^0-9]/g,'');
		} else {
			rs = data;
		}
	}
	return rs;
}
import { useState } from "react";
import { useController } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormInput from "./DynamicInput";

interface DropdownInputProps {
  placeholder: string;
  name: string;
  control: any;
  items: string[];
  error?: string;
}

export default function DropdownInput({
  placeholder,
  name,
  control,
  items = [],
  error,
}: DropdownInputProps) {
  const [open, setOpen] = useState(false);

  // CONNECT TO REACT HOOK FORM
  const { field } = useController({
    name,
    control,
  });

  const handleSelect = (item: string) => {
    field.onChange(item);
    setOpen(false);
  };

  return (
    <View>
      <FormInput
        control={control}
        placeholder={field.value || placeholder}
        name={name}
        type="text"
        isDropdown={true}
        isOpen={open}
        onDropdownPress={() => setOpen(!open)}
      />

      {/* DROPDOWN LIST */}
      {open && (
        <View
          style={{
            backgroundColor: "#F2F3F5",
            marginBottom: 15,
            padding: 12,
            borderRadius: 16,
          }}
        >
          <ScrollView
            style={{ maxHeight: 110 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(item)}
                style={{ paddingVertical: 8 }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 15,
                    color: "#555",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      {/* SHOW ERROR LIKE FORMINPUT */}
      {error && <Text className="text-red-600 pl-2 text-xs mt-1">{error}</Text>}
    </View>
  );
}

import Button from "@/components/controls/Button";
import DropdownInput from "@/components/controls/DropdownInput";
import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import FormInput from "@/components/controls/DynamicInput";

type FileType = {
  uri: string;
  name: string;
  type: string;
};

const { width, height } = Dimensions.get("window");
const currentYear = new Date().getFullYear();

// --- SCHEMAS DEFINITIONS ---
const schemaStep1 = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  month: z.string().nullable().refine((val) => val, { message: "Month is required" }),
  day: z.string().min(1, "Day is required").refine((v) => Number(v) >= 1 && Number(v) <= 31, "Day must be 1–31"),
  year: z.string().min(4, "Year is required").refine((v) => Number(v) >= 1950 && Number(v) <= currentYear, `Year must be 1950-${currentYear}`),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().nullable().refine((val) => val, { message: "Gender is required" }),
});

const schemaStep2 = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  month: z.string().nullable().refine((val) => val, { message: "Month is required" }),
  day: z.string().min(1, "Day is required").refine((v) => Number(v) >= 1 && Number(v) <= 31, "Day must be 1–31"),
  year: z.string().min(4, "Year is required").refine((v) => Number(v) >= 1950 && Number(v) <= currentYear, `Year must be 1950-${currentYear}`),
  nationalIdCardNumber: z.string().min(1, "National ID is required"),
  documentUrl: z.string().refine((val) => val.length > 0, { message: "Document upload is required" }),
});

const schemaStep3 = z.object({
  shortAddress: z.string().min(1, "Short address is required"),
  building: z.string().min(1, "Building # is required"),
  street: z.string().min(1, "Street is required"),
  secondary: z.string().optional(),
  district: z.string().min(1, "District is required"),
  postal: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
});

const parseDate = (str: string) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const schemaStep4 = z.object({
  licenseIssueDate: z.string().min(1, "License Issue Date is required"),
  licenseExpiryDate: z.string().min(1, "License Expiry Date is required"),
  drivingLicenseNumber: z.string().min(1, "Driving License Number is required"),
}).refine(
  (data) => {
    const issue = parseDate(data.licenseIssueDate);
    const expiry = parseDate(data.licenseExpiryDate);
    return expiry > issue;
  },
  { message: "Expiry date must be after Issue date", path: ["licenseExpiryDate"] }
);

const PersonalDetails = () => {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<FileType | null>(null);
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [selectedLicenceDoc, setSelectedLicenceDoc] = useState<FileType | null>(null);
  const [uploadedLicenceDoc, setUploadedLicenceDoc] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 >(1);

  // Fake states matching your initial templates
  const uploading = false;
  const uploadingLicence = false;

  // --- FORM SETUPS ---
  const form1 = useForm({ resolver: zodResolver(schemaStep1), defaultValues: { firstName: "", lastName: "", month: null, day: "", year: "", nationality: "", gender: null } });
  const form2 = useForm({ resolver: zodResolver(schemaStep2), defaultValues: { firstName: "", lastName: "", month: null, day: "", year: "", nationalIdCardNumber: "", documentUrl: "" } });
  const form3 = useForm({ resolver: zodResolver(schemaStep3), defaultValues: { shortAddress: "", building: "", street: "", district: "", postal: "", city: "" } });
  const form4 = useForm({ resolver: zodResolver(schemaStep4), defaultValues: { licenseIssueDate: "", licenseExpiryDate: "", drivingLicenseNumber: "" } });

  const formatDate = (value: any) => {
    const v = value.replace(/\D/g, "").slice(0, 8);
    if (v.length <= 2) return v;
    if (v.length <= 4) return `${v.slice(0, 2)}/${v.slice(2)}`;
    return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  };

  const monthMap: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
    July: "07", Augest: "08", August: "08", September: "09", October: "10", November: "11", December: "12"
  };

  const handleNationalId = async (data: any) => {
    const monthNumber = monthMap[data.month] || "01";
    const formattedDay = String(data.day).padStart(2, "0");
    console.log("Personal details:", {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      dateOfBirth: `${data.year}-${monthNumber}-${formattedDay}`,
      gender: data.gender.toLowerCase().trim(),
      nationality: data.nationality.trim(),
    });
    setStep(2);
  };

  const pickDocument = async () => {
    console.log("Document picker disabled; no picker module available.");
  };

  const removeDocument = () => {
    setSelectedDoc(null);
    setUploadedDoc(null);
    form2.setValue("documentUrl", "", { shouldValidate: true });
  };

  useEffect(() => {
    if (uploadedDoc) setSelectedDoc(null);
  }, [uploadedDoc]);

  // const handleNationality = async (data: any) => {
  //   if (!selectedDoc) {
  //     form2.setError("documentUrl", { type: "manual", message: "Document upload is required" });
  //     return;
  //   }
  //   setStep(3);
  // };

  const handleNationalAddress = async (data: any) => {
    console.log("Address details:", data);
    // setStep(2);
    router.replace("/(main)/(tabs)");
  };

  const pickLicenceDoc = async () => {
    console.log("Licence document picker disabled; no picker module available.");
  };

  const removeLicenceDoc = () => {
    setSelectedLicenceDoc(null);
    setUploadedLicenceDoc(null);
  };

  // const DrivingLicense = async (data: any) => {
  //   const convertToYMD = (d: string) => {
  //     const [day, month, year] = d.split("/");
  //     return `${year}-${month}-${day}`;
  //   };
  //   console.log("Driving license complete:", data);
  //   router.replace("/user/(tabs)");
  // };

  const getStepBarColor = (currentBarStep: number) => {
    return step >= currentBarStep ? '#ff3f6c' : '#E5E7EB';
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          
          {/* Top Branding & Multi-Step Progress Tracker */}
          <View style={styles.headerBlock}>
            <Image
              source={require("../../assets/zwigato.jpg")}
              style={styles.logo}
            />
            <View style={styles.progressRow}>
              <View style={[styles.progressBar, { backgroundColor: getStepBarColor(1) }]} />
              <View style={[styles.progressBar, { backgroundColor: getStepBarColor(2) }]} />
              <View style={[styles.progressBar, { backgroundColor: getStepBarColor(3) }]} />
              <View style={[styles.progressBar, { backgroundColor: getStepBarColor(4) }]} />
            </View>
          </View>

          {/* --- STEP 1: PERSONAL DETAILS --- */}
          {step === 1 && (
            <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.stepContentWrapper}>
                <View style={styles.headingGroup}>
                  <Text variant="semibold" style={styles.titleText}>Personal details</Text>
                  <Text style={styles.subtitleText}>Let's get to know you a little better</Text>
                </View>

                <View style={styles.formStack}>
                  <FormInput control={form1.control} placeholder="First Name" name="firstName" type="text" />
                  <FormInput control={form1.control} placeholder="Last Name" name="lastName" type="text" />
                  <DropdownInput control={form1.control} name="month" placeholder="Month" items={["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]} />
                  
                  <View style={styles.splitInputRow}>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form1.control} placeholder="Day" name="day" type="phone" maxLength={2} />
                    </View>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form1.control} placeholder="Year" name="year" type="phone" maxLength={4} />
                    </View>
                  </View>

                  <FormInput control={form1.control} placeholder="Nationality" name="nationality" type="text" />
                  <DropdownInput control={form1.control} name="gender" placeholder="Gender" items={["Male", "Female", "Other"]} />
                </View>

                <View style={styles.bottomButtonContainer}>
                  <Button variant="primary" onPress={form1.handleSubmit(handleNationalId)}>
                    <Text variant="semibold" style={styles.singleBtnText}>Next</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          )}

          {/* --- STEP 2: NATIONAL ID UPLOAD --- */}
          {/* {step === 2 && (
            <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.stepContentWrapper}>
                <View style={styles.headingGroup}>
                  <Text variant="semibold" style={styles.titleText}>National ID</Text>
                  <Text style={styles.subtitleText}>Provide your valid National ID for verification</Text>
                </View>

                <View style={styles.formStack}>
                  <FormInput control={form2.control} placeholder="First Name" name="firstName" type="text" />
                  <FormInput control={form2.control} placeholder="Last Name" name="lastName" type="text" />
                  <DropdownInput control={form2.control} name="month" placeholder="Month" items={["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"]} />
                  
                  <View style={styles.splitInputRow}>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form2.control} placeholder="Day" name="day" type="phone" maxLength={2} />
                    </View>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form2.control} placeholder="Year" name="year" type="phone" maxLength={4} />
                    </View>
                  </View>
                  
                  <FormInput control={form2.control} placeholder="National ID" name="nationalIdCardNumber" type="phone" maxLength={12} />
                  <Controller control={form2.control} name="documentUrl" render={() => <View style={{ display: "none" }} />} />

                  <View style={styles.uploadBlock}>
                    <Text style={styles.uploadInfoText}>Provide your valid National ID for verification</Text>
                    
                    {!selectedDoc && !uploadedDoc && (
                      <Button variant="secondary" onPress={pickDocument}>
                        <Text variant="semibold" style={styles.uploadBtnText}>Upload Documents</Text>
                      </Button>
                    )}

                    {form2.formState.errors.documentUrl && (
                      <Text style={styles.errorText}>{form2.formState.errors.documentUrl.message}</Text>
                    )}

                    {selectedDoc && !uploadedDoc && (
                      <View style={styles.previewBox}>
                        <Image source={{ uri: selectedDoc.uri }} style={styles.previewImage} resizeMode="contain" />
                        <View style={styles.cancelBtnWrap}>
                          <Button variant="secondary" onPress={removeDocument}>
                            <Text style={styles.uploadBtnText}>Cancel</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.dualButtonRow}>
                  <View style={styles.splitInputWrap}>
                    <Button onPress={() => setStep(1)} variant="secondary">
                      <Text variant="semibold" style={styles.uploadBtnText}>Prev</Text>
                    </Button>
                  </View>
                  <View style={styles.splitInputWrap}>
                    <Button variant="primary" onPress={form2.handleSubmit(handleNationality)}>
                      <Text variant="semibold" style={styles.singleBtnText}>Next</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          )} */}

          {/* --- STEP 3: NATIONAL ADDRESS --- */}
          {step === 2 && (
            <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.stepContentWrapper}>
                <View style={styles.headingGroup}>
                  <Text variant="semibold" style={styles.titleText}>National Address</Text>
                  <Text style={styles.subtitleText}>Provide your current residential address</Text>
                </View>

                <View style={styles.formStack}>
                  <FormInput control={form3.control} placeholder="Short Address" name="shortAddress" type="text" />
                  <View style={styles.splitInputRow}>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form3.control} placeholder="Building #" name="building" type="text" />
                    </View>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form3.control} placeholder="Street" name="street" type="text" />
                    </View>
                  </View>
                  <FormInput control={form3.control} placeholder="District" name="district" type="text" />
                  <View style={styles.splitInputRow}>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form3.control} placeholder="Postal Code" name="postal" type="phone" maxLength={5} />
                    </View>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form3.control} placeholder="City" name="city" type="text" />
                    </View>
                  </View>
                </View>

                <View style={styles.dualButtonRow}>
                  <View style={styles.splitInputWrap}>
                    <Button onPress={() => setStep(2)} variant="secondary">
                      <Text variant="semibold" style={styles.uploadBtnText}>Prev</Text>
                    </Button>
                  </View>
                  <View style={styles.splitInputWrap}>
                    <Button variant="primary" onPress={form3.handleSubmit(handleNationalAddress)}>
                      <Text variant="semibold" style={styles.singleBtnText}>Next</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}

          {/* --- STEP 4: DRIVER'S LICENSE --- */}
          {/* {step === 3 && (
            <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.stepContentWrapper}>
                <View style={styles.headingGroup}>
                  <Text variant="semibold" style={styles.titleText}>Driver's License</Text>
                  <Text style={styles.subtitleText}>License is needed to verify driving eligibility</Text>
                </View>

                <View style={styles.formStack}>
                  <View style={styles.splitInputRow}>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form4.control} name="licenseIssueDate" placeholder="DD/MM/YY Issue Date" type="text" onValueChange={(text) => formatDate(text)} />
                    </View>
                    <View style={styles.splitInputWrap}>
                      <FormInput control={form4.control} placeholder="DD/MM/YY Expiry Date" name="licenseExpiryDate" type="text" onValueChange={(text) => formatDate(text)} />
                    </View>
                  </View>
                  
                  <FormInput control={form4.control} placeholder="Driving License Number" name="drivingLicenseNumber" type="phone" maxLength={12} />

                  <View style={styles.uploadBlock}>
                    <Text style={styles.uploadInfoText}>Please upload a copy of your documents for verification</Text>
                    
                    {!selectedLicenceDoc && !uploadedLicenceDoc && (
                      <Button variant="secondary" onPress={pickLicenceDoc}>
                        <Text variant="semibold" style={styles.uploadBtnText}>Upload Documents</Text>
                      </Button>
                    )}

                    {selectedLicenceDoc && !uploadedLicenceDoc && (
                      <View style={styles.previewBox}>
                        <Image source={{ uri: selectedLicenceDoc.uri }} style={styles.previewImage} resizeMode="contain" />
                        <View style={styles.cancelBtnWrap}>
                          <Button variant="secondary" onPress={removeLicenceDoc}>
                            <Text style={styles.uploadBtnText}>Cancel</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.dualButtonRow}>
                  <View style={styles.splitInputWrap}>
                    <Button onPress={() => setStep(3)} variant="secondary">
                      <Text variant="semibold" style={styles.uploadBtnText}>Prev</Text>
                    </Button>
                  </View>
                  <View style={styles.splitInputWrap}>
                    <Button variant="primary" onPress={form4.handleSubmit(DrivingLicense)}>
                      <Text variant="semibold" style={styles.singleBtnText}>Continue</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </ScrollView>
          )} */}

        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF1F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    height: '90%',
    width: '90%',
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerBlock: {
    width: '100%',
    marginBottom: 12,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: 16,
  },
  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 4,
  },
  scrollGrow: {
    flexGrow: 1,
  },
  stepContentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  headingGroup: {
    alignItems: 'center',
    marginBottom: height > 800 ? 24 : 12,
  },
  titleText: {
    fontSize: height > 800 ? 32 : 26,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 4,
    textAlign: 'center',
  },
  formStack: {
    gap: height > 800 ? 14 : 10,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  splitInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  splitInputWrap: {
    width: '48%',
  },
  uploadBlock: {
    gap: 12,
    marginTop: 8,
  },
  uploadInfoText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4B5563',
  },
  uploadBtnText: {
    fontSize: 15,
    color: '#4B5563',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  previewBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  previewImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
  },
  cancelBtnWrap: {
    alignItems: 'end',
    marginTop: 8,
  },
  bottomButtonContainer: {
    width: '100%',
    marginTop: 20,
  },
  dualButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  singleBtnText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});

export default PersonalDetails;
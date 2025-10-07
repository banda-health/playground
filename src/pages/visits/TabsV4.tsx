import React, { useState } from 'react';
import {
	Calendar,
	User,
	FileText,
	Heart,
	Baby,
	Stethoscope,
	Plus,
	AlertCircle,
	ChevronDown,
	Eye,
	Home,
	Activity,
	RefreshCw,
	Brain,
	Scissors,
} from 'lucide-react';

export default function TabsV4() {
	const [activeTab, setActiveTab] = useState('general');
	const [formData, setFormData] = useState({
		patientName: 'Irene njerl',
		patientId: '200157699',
		date: '2025-10-01 8:39 AM',
		sendTo: 'Cashier / Registration',
		clinician: '',
		referral: '',
		referredFromTo: '',
		priceList: 'mtiba',
		patientType: 'Outpatient (OPD)',
		firstVisit: true,
		vitals: [],
		chiefComplaint: '',
	});

	const tabs = [
		{ id: 'general', label: 'General', icon: Stethoscope },
		{ id: 'family-planning', label: 'Family Planning', icon: Heart },
		{ id: 'anc', label: 'ANC', icon: Baby },
		{ id: 'immunization', label: 'Immunization', icon: Plus },
		{ id: 'inpatient', label: 'Inpatient', icon: Home },
		{ id: 'maternity', label: 'Maternity', icon: Baby },
		{ id: 'dental', label: 'Dental', icon: Activity },
		{ id: 'eye', label: 'Eye Clinic', icon: Eye },
		{ id: 'surgery', label: 'Surgery', icon: Scissors },
		{ id: 'home-visit', label: 'Home Visit', icon: Home },
		{ id: 'physical-therapy', label: 'Physical Therapy', icon: Activity },
		{ id: 'follow-up', label: 'Follow-up', icon: RefreshCw },
		{ id: 'mental-health', label: 'Mental Health', icon: Brain },
	];

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const renderGeneralTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Complaint
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={3}
				/>
			</div>
			<div className="mb-6">
				<div className="flex justify-between items-center mb-3">
					<h2 className="text-lg font-semibold text-gray-700">
						Clinical Details
					</h2>
					<button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
						View Allergies (0)
					</button>
				</div>
				<div className="space-y-4">
					<div>
						<div className="text-xs text-gray-500 mb-1">History:</div>
						<textarea
							className="w-full px-3 py-2 border border-gray-300 rounded"
							rows={2}
						/>
					</div>
					<div>
						<div className="text-xs text-gray-500 mb-1">Physical Exam:</div>
						<textarea
							className="w-full px-3 py-2 border border-gray-300 rounded"
							rows={2}
						/>
					</div>
					<div>
						<div className="text-xs text-gray-500 mb-1">Treatment:</div>
						<textarea
							className="w-full px-3 py-2 border border-gray-300 rounded"
							rows={2}
						/>
					</div>
					<div className="border border-gray-200 rounded">
						<div className="bg-gray-50 px-4 py-2 border-b text-sm font-medium text-gray-700">
							Enter Diagnosis
						</div>
						<div className="p-4">
							<input
								type="text"
								placeholder="Search Diagnosis e.g. UTI"
								className="w-full px-3 py-2 border border-gray-300 rounded"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-700 mb-3">
					Laboratory Tests
				</h2>
				<div className="border border-gray-200 rounded">
					<div className="bg-gray-50 px-4 py-2 grid grid-cols-6 gap-4 text-xs font-medium text-gray-600 border-b">
						<div className="col-span-2">Test</div>
						<div>Result</div>
						<div>Reference Range</div>
						<div>Notes</div>
						<div>Delete</div>
					</div>
					<div className="p-4">
						<input
							type="text"
							placeholder="Search Test e.g. Full Hemogram"
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
					</div>
				</div>
			</div>
		</>
	);

	const renderFamilyPlanningTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Complaint / Reason for Visit
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
					placeholder="e.g., New method request, follow-up, side effects..."
				/>
			</div>
			<div className="mb-6 p-5 bg-pink-50 border border-pink-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Heart className="w-5 h-5 text-pink-600" />
					Family Planning Assessment
				</h2>
				<div className="grid grid-cols-2 gap-6 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Current/Desired Contraceptive Method
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option value="">Select method</option>
							<option>Oral Contraceptive Pills</option>
							<option>Injectables</option>
							<option>IUD</option>
							<option>Implant</option>
							<option>Condoms</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Next Follow-up Visit
						</label>
						<input
							type="date"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="flex items-center">
						<input type="checkbox" className="mr-2 w-4 h-4" />
						<span className="text-sm text-gray-700">
							Full counseling provided on method options, effectiveness, side
							effects, and warning signs
						</span>
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Supplies Provided / Instructions
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderANCTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Complaint / Concerns
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-purple-50 border border-purple-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Baby className="w-5 h-5 text-purple-600" />
					Antenatal Care Assessment
				</h2>
				<div className="grid grid-cols-4 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Gestational Age (weeks)
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="28"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fundal Height (cm)
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="28"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fetal Heart Rate (bpm)
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="140"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Risk Level
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option value="">Select</option>
							<option>Low</option>
							<option>Moderate</option>
							<option>High</option>
						</select>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Assessment & Plan
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderImmunizationTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Reason for Visit
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-green-50 border border-green-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Plus className="w-5 h-5 text-green-600" />
					Immunization Record
				</h2>
				<div className="border border-gray-200 rounded bg-white mb-4">
					<div className="bg-gray-50 px-4 py-2 grid grid-cols-6 gap-4 text-xs font-medium text-gray-600 border-b">
						<div className="col-span-2">Vaccine</div>
						<div>Dose</div>
						<div>Site</div>
						<div>Batch/Lot</div>
						<div>Delete</div>
					</div>
					<div className="p-4">
						<input
							type="text"
							placeholder="Search vaccine e.g. BCG, OPV..."
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Next Immunization Due
						</label>
						<input
							type="date"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
			</div>
		</>
	);

	const renderInpatientTab = () => (
		<>
			<div className="mb-6 p-5 bg-indigo-50 border border-indigo-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Home className="w-5 h-5 text-indigo-600" />
					Inpatient Admission Details
				</h2>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Admission Date/Time
						</label>
						<input
							type="datetime-local"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Ward/Room Number
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="Ward A - Room 12"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Bed Number
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="Bed 3"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Admitting Diagnosis
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Attending Physician
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Admission Notes
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={3}
						placeholder="Reason for admission, initial assessment..."
					/>
				</div>
			</div>
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-gray-700 mb-3">
					Daily Progress Notes
				</h2>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={3}
					placeholder="Patient condition, interventions, plan..."
				/>
			</div>
		</>
	);

	const renderMaternityTab = () => (
		<>
			<div className="mb-6 p-5 bg-rose-50 border border-rose-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Baby className="w-5 h-5 text-rose-600" />
					Maternity/Labor & Delivery
				</h2>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Admission Stage
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option>Early Labor</option>
							<option>Active Labor</option>
							<option>Transition</option>
							<option>Delivery</option>
							<option>Postpartum</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Gravida/Para
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="G2P1"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Gestational Age
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="39 weeks"
						/>
					</div>
				</div>
				<div className="grid grid-cols-4 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Cervical Dilation (cm)
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Effacement (%)
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Station
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="-2, 0, +2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fetal Heart Rate
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Labor Progress & Interventions
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div className="border-t border-rose-200 pt-4">
					<h3 className="font-semibold text-gray-700 mb-3">
						Delivery Details (if applicable)
					</h3>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Delivery Date/Time
							</label>
							<input
								type="datetime-local"
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Delivery Method
							</label>
							<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
								<option>Spontaneous Vaginal</option>
								<option>Assisted (Forceps/Vacuum)</option>
								<option>Cesarean Section</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Baby Gender
							</label>
							<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
								<option>Male</option>
								<option>Female</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</>
	);

	const renderDentalTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Dental Complaint
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-teal-50 border border-teal-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Activity className="w-5 h-5 text-teal-600" />
					Dental Examination
				</h2>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Oral Examination Findings
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Gums, teeth condition, oral hygiene..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Dental Chart / Affected Teeth
					</label>
					<input
						type="text"
						className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						placeholder="e.g., #14, #26, #32"
					/>
				</div>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Diagnosis
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., Dental caries, gingivitis"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Procedure Performed
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., Extraction, filling, cleaning"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Treatment Plan & Follow-up
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderEyeTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Eye Complaint
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Eye className="w-5 h-5 text-amber-600" />
					Eye Examination
				</h2>
				<div className="grid grid-cols-2 gap-6 mb-4">
					<div className="space-y-3">
						<h3 className="font-semibold text-gray-700">Right Eye (OD)</h3>
						<div>
							<label className="block text-xs text-gray-600 mb-1">
								Visual Acuity
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								placeholder="20/20"
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-600 mb-1">
								Intraocular Pressure
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								placeholder="15 mmHg"
							/>
						</div>
					</div>
					<div className="space-y-3">
						<h3 className="font-semibold text-gray-700">Left Eye (OS)</h3>
						<div>
							<label className="block text-xs text-gray-600 mb-1">
								Visual Acuity
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								placeholder="20/20"
							/>
						</div>
						<div>
							<label className="block text-xs text-gray-600 mb-1">
								Intraocular Pressure
							</label>
							<input
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								placeholder="15 mmHg"
							/>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Examination Findings
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="External exam, pupil response, fundoscopy findings..."
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Diagnosis
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Prescription/Treatment
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
			</div>
		</>
	);

	const renderSurgeryTab = () => (
		<>
			<div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Scissors className="w-5 h-5 text-red-600" />
					Surgical Procedure
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Procedure Name
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Procedure Type
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option>Minor Surgery</option>
							<option>Major Surgery</option>
							<option>Emergency Surgery</option>
							<option>Elective Surgery</option>
						</select>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Surgeon
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Anesthesia Type
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option>Local</option>
							<option>Regional</option>
							<option>General</option>
							<option>Sedation</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Surgery Date/Time
						</label>
						<input
							type="datetime-local"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Pre-operative Diagnosis
					</label>
					<input
						type="text"
						className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Operative Notes
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={3}
						placeholder="Procedure details, findings, complications..."
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Post-operative Instructions
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderHomeVisitTab = () => (
		<>
			<div className="mb-6 p-5 bg-sky-50 border border-sky-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Home className="w-5 h-5 text-sky-600" />
					Home Visit Details
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Visit Date/Time
						</label>
						<input
							type="datetime-local"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Home Address
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Reason for Home Visit
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Follow-up care, elderly care, mobility issues..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Home Environment Assessment
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Living conditions, safety concerns, support system..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Clinical Assessment & Findings
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Care Plan & Recommendations
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderPhysicalTherapyTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Chief Complaint / Area of Concern
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-lime-50 border border-lime-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Activity className="w-5 h-5 text-lime-600" />
					Physical Therapy Assessment
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Session Number
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="Session 1 of 10"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Primary Condition
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., Post-surgical rehab, back pain"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Range of Motion & Strength Assessment
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Exercises/Modalities Performed
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Exercises, manual therapy, electrical stimulation..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Patient Response & Progress
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Home Exercise Program
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	const renderFollowUpTab = () => (
		<>
			<div className="mb-6 p-5 bg-cyan-50 border border-cyan-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<RefreshCw className="w-5 h-5 text-cyan-600" />
					Follow-up Visit
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Original Visit Date
						</label>
						<input
							type="date"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Original Diagnosis/Condition
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Reason for Follow-up
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Medication review, test results, progress check..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Current Symptoms / Progress Since Last Visit
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Assessment & Changes to Treatment Plan
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Next Follow-up Date
						</label>
						<input
							type="date"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
					<div>
						<label className="flex items-center pt-8">
							<input type="checkbox" className="mr-2 w-4 h-4" />
							<span className="text-sm text-gray-700">
								Discharge from follow-up care
							</span>
						</label>
					</div>
				</div>
			</div>
		</>
	);

	const renderMentalHealthTab = () => (
		<>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-600 mb-2">
					Presenting Concern
				</label>
				<textarea
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
				/>
			</div>
			<div className="mb-6 p-5 bg-violet-50 border border-violet-200 rounded-lg">
				<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
					<Brain className="w-5 h-5 text-violet-600" />
					Mental Health Assessment
				</h2>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Session Type
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option>Initial Assessment</option>
							<option>Follow-up Therapy</option>
							<option>Medication Review</option>
							<option>Crisis Intervention</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Session Number
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="Session 1"
						/>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Mental Status Examination
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Appearance, mood, affect, thought process, insight..."
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Risk Assessment
					</label>
					<div className="grid grid-cols-3 gap-4">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="text-sm">Suicide risk</span>
						</label>
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="text-sm">Self-harm risk</span>
						</label>
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span className="text-sm">Risk to others</span>
						</label>
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Diagnosis/Working Diagnosis
					</label>
					<input
						type="text"
						className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Session Notes / Interventions
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={3}
						placeholder="Topics discussed, therapeutic interventions used, patient response..."
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Treatment Plan & Goals
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
					/>
				</div>
			</div>
		</>
	);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="bg-white rounded-t-lg shadow-sm px-6 py-4 border-b border-gray-200">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold text-gray-700">
							Update Visit
						</h1>
						<span className="text-sm text-gray-600">Kevin Burnett</span>
					</div>
				</div>

				<div className="bg-gray-100 px-6 py-3 flex items-center justify-between text-sm border-b border-gray-300">
					<div className="flex gap-6">
						<span>
							<strong>{formData.patientName}</strong>
						</span>
						<span>
							Patient # <strong>{formData.patientId}</strong>
						</span>
						<button className="text-blue-600 hover:underline">
							View More Patient Info / Appointments
						</button>
					</div>
					<div className="flex gap-6">
						<span>
							Total Visits: <strong>_</strong>
						</span>
						<span>
							Last Visit Date: <strong>_</strong>
						</span>
						<span>
							Open Balance: <strong>0</strong>
						</span>
					</div>
				</div>

				<div className="bg-white shadow-sm">
					<div className="px-6 pt-6 pb-4">
						<div className="grid grid-cols-3 gap-6 mb-6">
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Patient Name
								</label>
								<input
									type="text"
									value={formData.patientName}
									className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
									readOnly
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Price List
								</label>
								<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
									<option>mtiba</option>
								</select>
							</div>
							<div className="flex items-end">
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={formData.firstVisit}
										className="mr-2"
									/>
									<span className="text-sm">First Visit</span>
								</label>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-6 mb-6">
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Send patient to
								</label>
								<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
									<option>{formData.sendTo}</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Clinician
								</label>
								<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
									<option value="">Select clinician</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Patient Type
								</label>
								<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
									<option>{formData.patientType}</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-6 mb-6">
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Date
								</label>
								<input
									type="text"
									value={formData.date}
									className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Referral
								</label>
								<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
									<option value="">Select referral</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 mb-1">
									Referred From/To
								</label>
								<input
									type="text"
									className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
								/>
							</div>
						</div>

						<div className="mb-4">
							<h2 className="text-lg font-semibold text-gray-700 mb-3">
								Vitals
							</h2>
							<div className="border border-gray-200 rounded">
								<div className="bg-gray-50 px-4 py-2 grid grid-cols-11 gap-2 text-xs font-medium text-gray-600 border-b">
									<div>Date/Time</div>
									<div>Height</div>
									<div>Weight</div>
									<div>BMI</div>
									<div>Temp</div>
									<div>BP</div>
									<div>Pulse</div>
									<div>RR</div>
									<div>SPO²</div>
									<div>MUAC</div>
									<div>Delete</div>
								</div>
								<div className="p-4">
									<button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
										+ Enter New Vitals Signs
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="border-b border-gray-300 overflow-x-auto">
						<div className="flex px-6 min-w-max">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
											activeTab === tab.id
												? 'border-blue-600 text-blue-600'
												: 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
										}`}
									>
										<Icon className="w-4 h-4" />
										{tab.label}
									</button>
								);
							})}
						</div>
					</div>

					<div className="px-6 py-6">
						{activeTab === 'general' && renderGeneralTab()}
						{activeTab === 'family-planning' && renderFamilyPlanningTab()}
						{activeTab === 'anc' && renderANCTab()}
						{activeTab === 'immunization' && renderImmunizationTab()}
						{activeTab === 'inpatient' && renderInpatientTab()}
						{activeTab === 'maternity' && renderMaternityTab()}
						{activeTab === 'dental' && renderDentalTab()}
						{activeTab === 'eye' && renderEyeTab()}
						{activeTab === 'surgery' && renderSurgeryTab()}
						{activeTab === 'home-visit' && renderHomeVisitTab()}
						{activeTab === 'physical-therapy' && renderPhysicalTherapyTab()}
						{activeTab === 'follow-up' && renderFollowUpTab()}
						{activeTab === 'mental-health' && renderMentalHealthTab()}

						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-700 mb-3">
								Products/Services
							</h2>
							<div className="border border-gray-200 rounded">
								<div className="bg-gray-50 px-4 py-2 grid grid-cols-8 gap-2 text-xs font-medium text-gray-600 border-b">
									<div className="col-span-2">Product or Service</div>
									<div>Instructions</div>
									<div>Existing Quantity</div>
									<div>Quantity</div>
									<div>Unit Selling Price</div>
									<div>Total</div>
									<div>Delete</div>
								</div>
								<div className="p-4 border-t">
									<input
										type="text"
										placeholder="Search product or service"
										className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
									/>
									<div className="flex justify-end">
										<div className="text-sm">
											<strong>Total:</strong> 0
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mb-6">
							<h2 className="text-lg font-semibold text-gray-700 mb-3">
								Payments
							</h2>
							<div className="border border-gray-200 rounded p-4">
								<div className="grid grid-cols-4 gap-4 mb-4">
									<div className="col-span-2">
										<label className="block text-xs text-gray-600 mb-1">
											Payment Type
										</label>
										<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm">
											<option value="">Select payment type</option>
										</select>
									</div>
									<div>
										<label className="block text-xs text-gray-600 mb-1">
											Amount Paid
										</label>
										<input
											type="text"
											value="0"
											className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
										/>
									</div>
									<div>
										<label className="block text-xs text-gray-600 mb-1">
											Description
										</label>
										<input
											type="text"
											className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
										/>
									</div>
								</div>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">Balance Due</span>
										<span className="font-medium">0</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Change Due</span>
										<span className="font-medium">0</span>
									</div>
									<div className="flex justify-end pt-2">
										<span className="text-xs text-gray-500">
											Visit #: 1003560
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-between items-center pt-6 border-t border-gray-200">
							<button className="px-6 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
								Cancel
							</button>
							<div className="flex gap-3">
								<button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
									Delete
								</button>
								<button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
									📅 Book Appointment
								</button>
								<button className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
									💾 Save
								</button>
								<button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
									Complete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

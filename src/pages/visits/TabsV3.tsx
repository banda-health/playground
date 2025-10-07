import { Baby, Heart, Plus, Stethoscope } from 'lucide-react';
import { useState } from 'react';

export default function TabsV3() {
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
		clinicalNotes: '',
		physicalExam: '',
		treatment: '',
		diagnosis: '',
		fpMethod: '',
		fpCounseling: false,
		contraceptiveProvided: '',
		fpNextVisit: '',
		gestationalAge: '',
		fundalHeight: '',
		fetalHeartRate: '',
		ancRisk: '',
	});

	const tabs = [
		{ id: 'general', label: 'General Visit', icon: Stethoscope },
		{ id: 'family-planning', label: 'Family Planning', icon: Heart },
		{ id: 'anc', label: 'Antenatal Care', icon: Baby },
		{ id: 'immunization', label: 'Immunization', icon: Plus },
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
					value={formData.chiefComplaint}
					onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
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
						<label className="block text-sm font-medium text-gray-600 mb-1">
							Clinical Notes
						</label>
						<div className="text-xs text-gray-500 mb-1">History:</div>
						<textarea
							value={formData.clinicalNotes}
							onChange={(e) =>
								handleInputChange('clinicalNotes', e.target.value)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
							rows={2}
						/>

						<div className="text-xs text-gray-500 mb-1">Physical Exam:</div>
						<textarea
							value={formData.physicalExam}
							onChange={(e) =>
								handleInputChange('physicalExam', e.target.value)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
							rows={2}
						/>

						<div className="text-xs text-gray-500 mb-1">Treatment:</div>
						<textarea
							value={formData.treatment}
							onChange={(e) => handleInputChange('treatment', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded"
							rows={2}
						/>
					</div>

					<div className="border border-gray-200 rounded">
						<div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b text-sm font-medium text-gray-700">
							<span>Enter Diagnosis</span>
							<div className="flex gap-4">
								<span>Primary</span>
								<span>Diagnosis</span>
								<span>Delete</span>
							</div>
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
						<div className="mt-4">
							<label className="block text-xs text-gray-600 mb-2">
								Lab / Imaging Notes
							</label>
							<textarea
								className="w-full px-3 py-2 border border-gray-300 rounded"
								rows={2}
							/>
						</div>
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
					value={formData.chiefComplaint}
					onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
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
						<select
							value={formData.fpMethod}
							onChange={(e) => handleInputChange('fpMethod', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						>
							<option value="">Select method</option>
							<option value="pills">
								Oral Contraceptive Pills (COCs/POPs)
							</option>
							<option value="injectables">
								Injectables (Depo-Provera, Sayana Press)
							</option>
							<option value="iud">Intrauterine Device (IUD)</option>
							<option value="implant">Implant (Jadelle, Implanon)</option>
							<option value="condoms-male">Male Condoms</option>
							<option value="condoms-female">Female Condoms</option>
							<option value="emergency">Emergency Contraception</option>
							<option value="natural">
								Natural Family Planning / Fertility Awareness
							</option>
							<option value="btl">Bilateral Tubal Ligation (BTL)</option>
							<option value="vasectomy">Vasectomy</option>
							<option value="none">None - Counseling Only</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Next Follow-up Visit
						</label>
						<input
							type="date"
							value={formData.fpNextVisit}
							onChange={(e) => handleInputChange('fpNextVisit', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>

				<div className="mb-4">
					<label className="flex items-center">
						<input
							type="checkbox"
							checked={formData.fpCounseling}
							onChange={(e) =>
								handleInputChange('fpCounseling', e.target.checked)
							}
							className="mr-2 w-4 h-4"
						/>
						<span className="text-sm text-gray-700">
							Full counseling provided on method options, effectiveness, side
							effects, and warning signs
						</span>
					</label>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Supplies Provided / Instructions
					</label>
					<textarea
						value={formData.contraceptiveProvided}
						onChange={(e) =>
							handleInputChange('contraceptiveProvided', e.target.value)
						}
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="e.g., 3 cycles of COCs provided, return in 3 months or if experiencing headaches, vision changes..."
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Additional Notes
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Client concerns, screening completed, referrals made..."
					/>
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
							placeholder="Search Test e.g. Pregnancy Test, HIV Test"
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
						<div className="mt-4">
							<label className="block text-xs text-gray-600 mb-2">
								Lab / Imaging Notes
							</label>
							<textarea
								className="w-full px-3 py-2 border border-gray-300 rounded"
								rows={2}
							/>
						</div>
					</div>
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
					value={formData.chiefComplaint}
					onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
					placeholder="Any concerns or symptoms reported..."
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
							value={formData.gestationalAge}
							onChange={(e) =>
								handleInputChange('gestationalAge', e.target.value)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., 28"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fundal Height (cm)
						</label>
						<input
							type="text"
							value={formData.fundalHeight}
							onChange={(e) =>
								handleInputChange('fundalHeight', e.target.value)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., 28"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fetal Heart Rate (bpm)
						</label>
						<input
							type="text"
							value={formData.fetalHeartRate}
							onChange={(e) =>
								handleInputChange('fetalHeartRate', e.target.value)
							}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="e.g., 140"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Risk Level
						</label>
						<select
							value={formData.ancRisk}
							onChange={(e) => handleInputChange('ancRisk', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						>
							<option value="">Select</option>
							<option value="low">Low Risk</option>
							<option value="moderate">Moderate Risk</option>
							<option value="high">High Risk</option>
						</select>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Fetal Presentation
						</label>
						<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
							<option value="">Select</option>
							<option value="cephalic">Cephalic</option>
							<option value="breech">Breech</option>
							<option value="transverse">Transverse</option>
							<option value="unknown">Unknown/Too early</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Next ANC Visit
						</label>
						<input
							type="date"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
						/>
					</div>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Physical Examination Findings
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="General appearance, edema, pallor, breast examination..."
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Plan & Education Provided
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Iron/folate prescribed, danger signs discussed, birth preparedness counseling..."
					/>
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
							placeholder="Search Test e.g. Hemoglobin, Blood Group, HIV, Ultrasound"
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
						<div className="mt-4">
							<label className="block text-xs text-gray-600 mb-2">
								Lab / Imaging Notes
							</label>
							<textarea
								className="w-full px-3 py-2 border border-gray-300 rounded"
								rows={2}
							/>
						</div>
					</div>
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
					value={formData.chiefComplaint}
					onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded"
					rows={2}
					placeholder="Routine immunization, catch-up, travel vaccines..."
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
							placeholder="Search vaccine e.g. BCG, OPV, Pentavalent..."
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Administered By
						</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							placeholder="Clinician name"
						/>
					</div>

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

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Notes / Adverse Events
					</label>
					<textarea
						className="w-full px-3 py-2 border border-gray-300 rounded"
						rows={2}
						placeholder="Any reactions, parent education provided, vaccine card updated..."
					/>
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
							placeholder="Search Test"
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
						<div className="mt-4">
							<label className="block text-xs text-gray-600 mb-2">
								Lab / Imaging Notes
							</label>
							<textarea
								className="w-full px-3 py-2 border border-gray-300 rounded"
								rows={2}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="bg-white rounded-t-lg shadow-sm px-6 py-4 border-b border-gray-200">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-semibold text-gray-700">
							Update Visit
						</h1>
						<span className="text-sm text-gray-600">Kevin Burnett</span>
					</div>
				</div>

				{/* Patient Info Bar */}
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

				{/* Main Form */}
				<div className="bg-white shadow-sm">
					{/* General Patient Info Section */}
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

						{/* Vitals Section */}
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

					{/* Tabs */}
					<div className="border-b border-gray-300">
						<div className="flex px-6">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
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

					{/* Tab Content */}
					<div className="px-6 py-6">
						{activeTab === 'general' && renderGeneralTab()}
						{activeTab === 'family-planning' && renderFamilyPlanningTab()}
						{activeTab === 'anc' && renderANCTab()}
						{activeTab === 'immunization' && renderImmunizationTab()}

						{/* Products/Services - Shows on all tabs */}
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
								<div className="px-4 py-3 grid grid-cols-8 gap-2 items-center text-sm">
									<div className="col-span-2">Fluconazole 150mg</div>
									<div></div>
									<div className="text-center">19 (0)</div>
									<div className="text-center">1</div>
									<div className="text-center">0</div>
									<div className="text-center">0</div>
									<div className="text-center">
										<button className="text-red-600 hover:text-red-800">
											🗑
										</button>
									</div>
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

						{/* Payments - Shows on all tabs */}
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

						{/* Action Buttons */}
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

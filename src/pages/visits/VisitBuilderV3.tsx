import React, { useState } from 'react';
import {
	Plus,
	X,
	Heart,
	Baby,
	Stethoscope,
	Syringe,
	FileText,
	ChevronDown,
} from 'lucide-react';

export default function ModularVisitForm() {
	const [formData, setFormData] = useState({
		patientName: 'Irene njerl',
		patientId: '200157699',
		date: '2025-10-01 8:39 AM',
		sendTo: 'Cashier / Registration',
		clinician: '',
		referral: '',
		referredFromTo: '',
		priceList: 'mtiba',
		visitType: 'Outpatient (OPD)',
		firstVisit: true,
	});

	const [activeSections, setActiveSections] = useState({
		vitals: true,
		chiefComplaint: true,
		clinicalDetails: false,
		familyPlanning: false,
		anc: false,
		immunization: false,
		lab: false,
	});

	const availableSections = [
		{
			id: 'clinicalDetails',
			label: 'Clinical Details',
			icon: Stethoscope,
			description: 'History, physical exam, treatment, diagnosis',
		},
		{
			id: 'familyPlanning',
			label: 'Family Planning',
			icon: Heart,
			description: 'Contraceptive methods, counseling, supplies',
		},
		{
			id: 'anc',
			label: 'Antenatal Care',
			icon: Baby,
			description: 'Gestational age, fundal height, fetal assessment',
		},
		{
			id: 'immunization',
			label: 'Immunization',
			icon: Syringe,
			description: 'Vaccine administration, schedule, batch tracking',
		},
		{
			id: 'lab',
			label: 'Laboratory Tests',
			icon: FileText,
			description: 'Order tests, record results',
		},
	];

	const visitTypePresets = {
		'General Consultation': [
			'vitals',
			'chiefComplaint',
			'clinicalDetails',
			'lab',
		],
		'Family Planning': ['vitals', 'chiefComplaint', 'familyPlanning', 'lab'],
		'Antenatal Care (ANC)': ['vitals', 'chiefComplaint', 'anc', 'lab'],
		Immunization: ['vitals', 'immunization'],
		'Lab Only': ['lab'],
		Custom: [],
	};

	const [selectedPreset, setSelectedPreset] = useState('');
	const [showAddSection, setShowAddSection] = useState(false);

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const addSection = (sectionId: string) => {
		setActiveSections((prev) => ({ ...prev, [sectionId]: true }));
		setShowAddSection(false);
	};

	const removeSection = (sectionId: string) => {
		if (sectionId === 'vitals' || sectionId === 'chiefComplaint') return;
		setActiveSections((prev) => ({ ...prev, [sectionId]: false }));
	};

	const applyPreset = (presetName: string) => {
		setSelectedPreset(presetName);
		if (presetName === 'Custom') return;

		const sections = visitTypePresets[presetName as keyof typeof visitTypePresets];
		const newActiveSections = {
			vitals: false,
			chiefComplaint: false,
			clinicalDetails: false,
			familyPlanning: false,
			anc: false,
			immunization: false,
			lab: false,
		};

		sections.forEach((section: string) => {
			newActiveSections[section as keyof typeof newActiveSections] = true;
		});

		setActiveSections(newActiveSections);
	};

	const getInactiveSections = () => {
		return availableSections.filter((section) => !activeSections[section.id as keyof typeof activeSections]);
	};

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

				<div className="bg-white shadow-sm px-6 py-6">
					<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Quick Setup: Select Visit Type
						</label>
						<div className="grid grid-cols-6 gap-2">
							{Object.keys(visitTypePresets).map((preset) => (
								<button
									key={preset}
									onClick={() => applyPreset(preset)}
									className={`px-4 py-2 text-sm rounded border-2 transition-all ${
										selectedPreset === preset
											? 'border-blue-600 bg-blue-100 text-blue-800 font-medium'
											: 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
									}`}
								>
									{preset}
								</button>
							))}
						</div>
						<p className="text-xs text-gray-600 mt-2">
							Select a preset to auto-configure the form, or choose "Custom" and
							add sections manually
						</p>
					</div>

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
								Visit Type
							</label>
							<select
								value={formData.visitType}
								onChange={(e) => handleInputChange('visitType', e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
							>
								<option>Outpatient (OPD)</option>
								<option>Inpatient (IPD)</option>
								<option>Emergency</option>
								<option>Referral</option>
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

					<div className="space-y-6">
						{activeSections.vitals && (
							<div className="border-2 border-gray-200 rounded-lg">
								<div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<Stethoscope className="w-5 h-5" />
										Vitals
									</h2>
									<span className="text-xs text-gray-500 italic">Required</span>
								</div>
								<div className="p-4">
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
						)}

						{activeSections.chiefComplaint && (
							<div className="border-2 border-gray-200 rounded-lg">
								<div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<FileText className="w-5 h-5" />
										Chief Complaint
									</h2>
									<span className="text-xs text-gray-500 italic">Required</span>
								</div>
								<div className="p-4">
									<textarea
										className="w-full px-3 py-2 border border-gray-300 rounded"
										rows={3}
										placeholder="Patient's main concern or reason for visit..."
									/>
								</div>
							</div>
						)}

						{activeSections.clinicalDetails && (
							<div className="border-2 border-blue-200 rounded-lg">
								<div className="bg-blue-50 px-4 py-3 flex justify-between items-center border-b border-blue-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<Stethoscope className="w-5 h-5 text-blue-600" />
										Clinical Details
									</h2>
									<button
										onClick={() => removeSection('clinicalDetails')}
										className="text-gray-500 hover:text-red-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								<div className="p-4 space-y-4">
									<div className="flex justify-end">
										<button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
											View Allergies (0)
										</button>
									</div>

									<div>
										<div className="text-xs text-gray-600 mb-1">History:</div>
										<textarea
											className="w-full px-3 py-2 border border-gray-300 rounded"
											rows={2}
											placeholder="Patient history, symptoms, duration..."
										/>
									</div>

									<div>
										<div className="text-xs text-gray-600 mb-1">
											Physical Exam:
										</div>
										<textarea
											className="w-full px-3 py-2 border border-gray-300 rounded"
											rows={2}
											placeholder="Examination findings..."
										/>
									</div>

									<div>
										<div className="text-xs text-gray-600 mb-1">Treatment:</div>
										<textarea
											className="w-full px-3 py-2 border border-gray-300 rounded"
											rows={2}
											placeholder="Treatment plan, medications..."
										/>
									</div>

									<div className="border border-gray-200 rounded">
										<div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b text-sm font-medium text-gray-700">
											<span>Enter Diagnosis</span>
											<div className="flex gap-4 text-xs">
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
						)}

						{activeSections.familyPlanning && (
							<div className="border-2 border-pink-200 rounded-lg">
								<div className="bg-pink-50 px-4 py-3 flex justify-between items-center border-b border-pink-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<Heart className="w-5 h-5 text-pink-600" />
										Family Planning
									</h2>
									<button
										onClick={() => removeSection('familyPlanning')}
										className="text-gray-500 hover:text-red-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								<div className="p-4 space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Contraceptive Method
											</label>
											<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
												<option value="">Select method</option>
												<option value="pills">Oral Contraceptive Pills</option>
												<option value="injectables">Injectables</option>
												<option value="iud">IUD</option>
												<option value="implant">Implant</option>
												<option value="condoms">Condoms</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Next Follow-up
											</label>
											<input
												type="date"
												className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
											/>
										</div>
									</div>

									<div>
										<label className="flex items-center">
											<input type="checkbox" className="mr-2 w-4 h-4" />
											<span className="text-sm text-gray-700">
												Counseling provided on methods, side effects, and
												warning signs
											</span>
										</label>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Supplies Provided / Notes
										</label>
										<textarea
											className="w-full px-3 py-2 border border-gray-300 rounded"
											rows={2}
											placeholder="Contraceptives provided, instructions given..."
										/>
									</div>
								</div>
							</div>
						)}

						{activeSections.anc && (
							<div className="border-2 border-purple-200 rounded-lg">
								<div className="bg-purple-50 px-4 py-3 flex justify-between items-center border-b border-purple-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<Baby className="w-5 h-5 text-purple-600" />
										Antenatal Care
									</h2>
									<button
										onClick={() => removeSection('anc')}
										className="text-gray-500 hover:text-red-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								<div className="p-4 space-y-4">
									<div className="grid grid-cols-4 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Gestational Age (weeks)
											</label>
											<input
												type="text"
												className="w-full px-3 py-2 border border-gray-300 rounded"
												placeholder="28"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Fundal Height (cm)
											</label>
											<input
												type="text"
												className="w-full px-3 py-2 border border-gray-300 rounded"
												placeholder="28"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Fetal Heart Rate
											</label>
											<input
												type="text"
												className="w-full px-3 py-2 border border-gray-300 rounded"
												placeholder="140"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Risk Level
											</label>
											<select className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
												<option value="">Select</option>
												<option value="low">Low</option>
												<option value="moderate">Moderate</option>
												<option value="high">High</option>
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
											placeholder="Findings, supplements prescribed, education provided..."
										/>
									</div>
								</div>
							</div>
						)}

						{activeSections.immunization && (
							<div className="border-2 border-green-200 rounded-lg">
								<div className="bg-green-50 px-4 py-3 flex justify-between items-center border-b border-green-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<Syringe className="w-5 h-5 text-green-600" />
										Immunization
									</h2>
									<button
										onClick={() => removeSection('immunization')}
										className="text-gray-500 hover:text-red-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								<div className="p-4 space-y-4">
									<div className="border border-gray-200 rounded">
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

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Administered By
											</label>
											<input
												type="text"
												className="w-full px-3 py-2 border border-gray-300 rounded"
												placeholder="Clinician name"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Next Immunization Due
											</label>
											<input
												type="date"
												className="w-full px-3 py-2 border border-gray-300 rounded"
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
											placeholder="Any reactions, parent education..."
										/>
									</div>
								</div>
							</div>
						)}

						{activeSections.lab && (
							<div className="border-2 border-cyan-200 rounded-lg">
								<div className="bg-cyan-50 px-4 py-3 flex justify-between items-center border-b border-cyan-200">
									<h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
										<FileText className="w-5 h-5 text-cyan-600" />
										Laboratory Tests
									</h2>
									<button
										onClick={() => removeSection('lab')}
										className="text-gray-500 hover:text-red-600"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								<div className="p-4">
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
							</div>
						)}

						{getInactiveSections().length > 0 && (
							<div className="relative">
								<button
									onClick={() => setShowAddSection(!showAddSection)}
									className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
								>
									<Plus className="w-5 h-5" />
									Add Section
								</button>

								{showAddSection && (
									<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4">
										<h3 className="text-sm font-semibold text-gray-700 mb-3">
											Add a section to this visit:
										</h3>
										<div className="space-y-2">
											{getInactiveSections().map((section) => {
												const Icon = section.icon;
												return (
													<button
														key={section.id}
														onClick={() => addSection(section.id)}
														className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-start gap-3"
													>
														<Icon className="w-5 h-5 text-gray-600 mt-0.5" />
														<div>
															<div className="font-medium text-gray-800">
																{section.label}
															</div>
															<div className="text-xs text-gray-600">
																{section.description}
															</div>
														</div>
													</button>
												);
											})}
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					<div className="mt-6 pt-6 border-t-2 border-gray-300">
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
									<button className="text-red-600 hover:text-red-800">🗑</button>
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

					<div className="mt-6">
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

					<div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
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
	);
}

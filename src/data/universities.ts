export interface UniversityRecord {
  name: string;
  aliases: string[];
  immunizationUrl: string;
  commonRequirementTags: string[];
  notes: string;
}

const commonTags = ['MMR', 'Tdap', 'Meningococcal', 'Varicella', 'Hepatitis B'];

export const universities: UniversityRecord[] = [
  { name: 'Harvard University', aliases: ['harvard'], immunizationUrl: 'https://huhs.harvard.edu/patients-and-visitors/medical-records-and-immunizations/immunization-compliance/', commonRequirementTags: commonTags, notes: 'Harvard maintains immunization compliance information through Harvard University Health Services.' },
  { name: 'MIT', aliases: ['mit', 'massachusetts institute of technology'], immunizationUrl: 'https://health.mit.edu/faqs/medical-report-immunizations', commonRequirementTags: commonTags, notes: 'MIT Health provides medical report and immunization guidance for students.' },
  { name: 'UCLA', aliases: ['ucla', 'university of california los angeles'], immunizationUrl: 'https://immunizationrequirement.ucla.edu/', commonRequirementTags: commonTags, notes: 'UCLA uses a dedicated immunization requirement portal.' },
  { name: 'USC', aliases: ['usc', 'university of southern california'], immunizationUrl: 'https://sites.usc.edu/new-student-health-requirements/immunizations/', commonRequirementTags: commonTags, notes: 'USC lists new student health requirements and immunizations through Student Health.' },
  { name: 'UC Irvine', aliases: ['uc irvine', 'uci', 'university of california irvine'], immunizationUrl: 'https://studenthealth.uci.edu/immunization-requirements/', commonRequirementTags: commonTags, notes: 'UCI Student Health publishes campus immunization requirements.' },
  { name: 'UC Santa Barbara', aliases: ['uc santa barbara', 'ucsb', 'university of california santa barbara'], immunizationUrl: 'https://studenthealth.sa.ucsb.edu/immunizations/university-immunization-requirements', commonRequirementTags: commonTags, notes: 'UCSB Student Health provides university immunization requirements.' },
  { name: 'Cornell University', aliases: ['cornell'], immunizationUrl: 'https://health.cornell.edu/services/immunizations-allergy-shots/immunizations', commonRequirementTags: commonTags, notes: 'Cornell Health provides immunization information for students.' },
  { name: 'Columbia University', aliases: ['columbia'], immunizationUrl: 'https://www.health.columbia.edu/immunization-compliance-office', commonRequirementTags: commonTags, notes: 'Columbia Health has an Immunization Compliance Office.' },
  { name: 'University of Washington', aliases: ['university of washington', 'uw'], immunizationUrl: 'https://wellbeing.uw.edu/husky-health/immunity/general-requirements/', commonRequirementTags: commonTags, notes: 'UW Husky Health publishes immunity and general requirements.' },
  { name: 'University of Michigan', aliases: ['university of michigan', 'umich', 'michigan'], immunizationUrl: 'https://uhs.umich.edu/immunizations', commonRequirementTags: commonTags, notes: 'University Health Service at Michigan provides immunization information.' },
  { name: 'Purdue University', aliases: ['purdue'], immunizationUrl: 'https://www.purdue.edu/push/services/students/immunization-requirements.php', commonRequirementTags: commonTags, notes: 'Purdue University Student Health lists immunization requirements.' },
  { name: 'University of Oregon', aliases: ['university of oregon', 'uoregon', 'oregon'], immunizationUrl: 'https://health.uoregon.edu/immunization-requirements-students', commonRequirementTags: commonTags, notes: 'University of Oregon Health Services publishes student immunization requirements.' },
  { name: 'University of Tennessee Knoxville', aliases: ['university of tennessee', 'utk', 'tennessee knoxville'], immunizationUrl: 'https://studenthealth.utk.edu/university-immunization-requirements/', commonRequirementTags: commonTags, notes: 'UTK Student Health provides university immunization requirements.' },
  { name: 'RIT', aliases: ['rit', 'rochester institute of technology'], immunizationUrl: 'https://www.rit.edu/studenthealth/immunizations', commonRequirementTags: commonTags, notes: 'RIT Student Health Center lists immunization information.' },
  { name: 'Temple University', aliases: ['temple'], immunizationUrl: 'https://studenthealth.temple.edu/services/immunizations/immunization-requirements-incoming-students', commonRequirementTags: commonTags, notes: 'Temple Student Health lists incoming student immunization requirements.' },
  { name: 'Illinois State University', aliases: ['illinois state', 'isu'], immunizationUrl: 'https://healthservices.illinoisstate.edu/medical-services/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Illinois State Student Health Services publishes immunization requirements.' },
  { name: 'Southern Illinois University', aliases: ['southern illinois', 'siu'], immunizationUrl: 'https://shc.siu.edu/immunizations/requiredvaccines/', commonRequirementTags: commonTags, notes: 'SIU Student Health Center provides required vaccine information.' },
  { name: 'Clark University', aliases: ['clark university', 'clark'], immunizationUrl: 'https://www.clarku.edu/health-services/immunization-policy/', commonRequirementTags: commonTags, notes: 'Clark University Health Services publishes immunization policy information.' },
  { name: 'Methodist University', aliases: ['methodist university', 'methodist'], immunizationUrl: 'https://www.methodist.edu/life-at-mu/health-wellness/health-services/student-immunizations/', commonRequirementTags: commonTags, notes: 'Methodist University lists student immunization information through Health Services.' },
  { name: 'Valparaiso University', aliases: ['valparaiso', 'valpo'], immunizationUrl: 'https://www.valpo.edu/student-life/student-health-center/valpo-international-students/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Valparaiso University provides immunization requirement information through Student Health.' },
  { name: 'Stanford University', aliases: ['stanford'], immunizationUrl: 'https://vaden.stanford.edu/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'Stanford Vaden Health Services provides immunization guidance.' },
  { name: 'Yale University', aliases: ['yale'], immunizationUrl: 'https://yalehealth.yale.edu/immunization-requirements', commonRequirementTags: commonTags, notes: 'Yale Health publishes immunization requirements.' },
  { name: 'Princeton University', aliases: ['princeton'], immunizationUrl: 'https://uhs.princeton.edu/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'Princeton University Health Services provides immunization information.' },
  { name: 'University of Pennsylvania', aliases: ['upenn', 'penn', 'university of pennsylvania'], immunizationUrl: 'https://wellness.upenn.edu/immunization-requirements', commonRequirementTags: commonTags, notes: 'Penn Wellness publishes immunization requirements.' },
  { name: 'Brown University', aliases: ['brown'], immunizationUrl: 'https://healthservices.brown.edu/immunizations', commonRequirementTags: commonTags, notes: 'Brown Health Services provides immunization information.' },
  { name: 'Dartmouth College', aliases: ['dartmouth'], immunizationUrl: 'https://students.dartmouth.edu/health-service/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'Dartmouth Health Service provides immunization information.' },
  { name: 'Duke University', aliases: ['duke'], immunizationUrl: 'https://studentaffairs.duke.edu/studenthealth/immunization-compliance/', commonRequirementTags: commonTags, notes: 'Duke Student Health publishes immunization compliance guidance.' },
  { name: 'Northwestern University', aliases: ['northwestern'], immunizationUrl: 'https://www.northwestern.edu/healthservice-evanston/medical-services/immunizations/index.html', commonRequirementTags: commonTags, notes: 'Northwestern Health Service publishes immunization information.' },
  { name: 'University of Chicago', aliases: ['university of chicago', 'uchicago'], immunizationUrl: 'https://wellness.uchicago.edu/medical-services/immunizations/', commonRequirementTags: commonTags, notes: 'UChicago Student Wellness provides immunization information.' },
  { name: 'Johns Hopkins University', aliases: ['johns hopkins', 'jhu'], immunizationUrl: 'https://wellbeing.jhu.edu/PrimaryCare/Immunizations/', commonRequirementTags: commonTags, notes: 'Johns Hopkins Student Health and Well-Being provides immunization guidance.' },
  { name: 'Georgetown University', aliases: ['georgetown'], immunizationUrl: 'https://studenthealth.georgetown.edu/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Georgetown Student Health Center publishes immunization requirements.' },
  { name: 'New York University', aliases: ['nyu', 'new york university'], immunizationUrl: 'https://www.nyu.edu/students/health-and-wellness/student-health-center/immunization-requirements.html', commonRequirementTags: commonTags, notes: 'NYU Student Health Center publishes immunization requirements.' },
  { name: 'Boston University', aliases: ['boston university', 'bu'], immunizationUrl: 'https://www.bu.edu/shs/getting-started/immunizations/', commonRequirementTags: commonTags, notes: 'BU Student Health Services lists immunization requirements.' },
  { name: 'Northeastern University', aliases: ['northeastern'], immunizationUrl: 'https://studenthealthplan.northeastern.edu/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Northeastern publishes student immunization requirement information.' },
  { name: 'Tufts University', aliases: ['tufts'], immunizationUrl: 'https://students.tufts.edu/health-wellness/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'Tufts Health and Wellness lists immunization information.' },
  { name: 'Boston College', aliases: ['boston college', 'bc'], immunizationUrl: 'https://www.bc.edu/bc-web/offices/student-affairs/sites/university-health-services/primary-care-center/immunizations.html', commonRequirementTags: commonTags, notes: 'Boston College University Health Services provides immunization information.' },
  { name: 'University of Virginia', aliases: ['university of virginia', 'uva'], immunizationUrl: 'https://www.studenthealth.virginia.edu/immunization-requirements', commonRequirementTags: commonTags, notes: 'UVA Student Health publishes immunization requirements.' },
  { name: 'Virginia Tech', aliases: ['virginia tech', 'vt'], immunizationUrl: 'https://healthcenter.vt.edu/new_student_information/immunization-requirements.html', commonRequirementTags: commonTags, notes: 'Virginia Tech Schiffert Health Center provides immunization requirements.' },
  { name: 'University of North Carolina at Chapel Hill', aliases: ['unc', 'unc chapel hill', 'university of north carolina'], immunizationUrl: 'https://campushealth.unc.edu/services/immunizations/immunization-requirements/', commonRequirementTags: commonTags, notes: 'UNC Campus Health publishes immunization requirements.' },
  { name: 'North Carolina State University', aliases: ['nc state', 'ncsu'], immunizationUrl: 'https://healthypack.dasa.ncsu.edu/immunizations/', commonRequirementTags: commonTags, notes: 'NC State Campus Health provides immunization information.' },
  { name: 'University of Florida', aliases: ['university of florida', 'uf'], immunizationUrl: 'https://healthcompliance.shcc.ufl.edu/immunization-requirement/', commonRequirementTags: commonTags, notes: 'UF Health Compliance lists immunization requirements.' },
  { name: 'Florida State University', aliases: ['florida state', 'fsu'], immunizationUrl: 'https://uhs.fsu.edu/health-compliance/immunization-requirements', commonRequirementTags: commonTags, notes: 'FSU University Health Services publishes immunization requirements.' },
  { name: 'University of Miami', aliases: ['university of miami', 'umiami'], immunizationUrl: 'https://studenthealth.studentaffairs.miami.edu/medical-services/immunization-information/index.html', commonRequirementTags: commonTags, notes: 'University of Miami Student Health provides immunization information.' },
  { name: 'Georgia Tech', aliases: ['georgia tech', 'gatech'], immunizationUrl: 'https://health.gatech.edu/immunization/requirements', commonRequirementTags: commonTags, notes: 'Georgia Tech Stamps Health Services publishes immunization requirements.' },
  { name: 'Emory University', aliases: ['emory'], immunizationUrl: 'https://studenthealth.emory.edu/services/immunization.html', commonRequirementTags: commonTags, notes: 'Emory Student Health Services provides immunization information.' },
  { name: 'University of Georgia', aliases: ['university of georgia', 'uga'], immunizationUrl: 'https://healthcenter.uga.edu/info/immunizations/', commonRequirementTags: commonTags, notes: 'UGA University Health Center provides immunization information.' },
  { name: 'University of Texas at Austin', aliases: ['ut austin', 'university of texas at austin', 'utexas'], immunizationUrl: 'https://healthyhorns.utexas.edu/requiredvaccine/index.html', commonRequirementTags: commonTags, notes: 'UT Austin University Health Services publishes required vaccine information.' },
  { name: 'Texas A&M University', aliases: ['texas a&m', 'texas a and m', 'tamu'], immunizationUrl: 'https://uhs.tamu.edu/medical/immunizations.html', commonRequirementTags: commonTags, notes: 'Texas A&M University Health Services provides immunization information.' },
  { name: 'Rice University', aliases: ['rice'], immunizationUrl: 'https://health.rice.edu/new-students/immunization-requirements', commonRequirementTags: commonTags, notes: 'Rice Student Health Services lists immunization requirements.' },
  { name: 'University of Houston', aliases: ['university of houston', 'uh'], immunizationUrl: 'https://uh.edu/healthcenter/services/immunizations/', commonRequirementTags: commonTags, notes: 'University of Houston Health Center provides immunization information.' },
  { name: 'Arizona State University', aliases: ['asu', 'arizona state'], immunizationUrl: 'https://eoss.asu.edu/health/parents/immunization', commonRequirementTags: commonTags, notes: 'ASU Health Services provides immunization information.' },
  { name: 'University of Arizona', aliases: ['university of arizona', 'uarizona'], immunizationUrl: 'https://health.arizona.edu/immunization-requirements', commonRequirementTags: commonTags, notes: 'University of Arizona Campus Health publishes immunization requirements.' },
  { name: 'University of Colorado Boulder', aliases: ['cu boulder', 'university of colorado boulder'], immunizationUrl: 'https://www.colorado.edu/healthcenter/immunizations', commonRequirementTags: commonTags, notes: 'CU Boulder Medical Services provides immunization information.' },
  { name: 'University of Denver', aliases: ['university of denver', 'du'], immunizationUrl: 'https://studentaffairs.du.edu/health-counseling-center/immunization-requirements', commonRequirementTags: commonTags, notes: 'University of Denver Health and Counseling Center publishes immunization requirements.' },
  { name: 'University of Utah', aliases: ['university of utah', 'utah'], immunizationUrl: 'https://studenthealth.utah.edu/services/immunizations.php', commonRequirementTags: commonTags, notes: 'University of Utah Student Health Center provides immunization information.' },
  { name: 'Brigham Young University', aliases: ['byu', 'brigham young'], immunizationUrl: 'https://health.byu.edu/immunizations', commonRequirementTags: commonTags, notes: 'BYU Student Health Center provides immunization information.' },
  { name: 'University of Wisconsin-Madison', aliases: ['uw madison', 'university of wisconsin', 'wisconsin madison'], immunizationUrl: 'https://www.uhs.wisc.edu/medical/immunizations/', commonRequirementTags: commonTags, notes: 'UW-Madison University Health Services publishes immunization information.' },
  { name: 'University of Minnesota', aliases: ['university of minnesota', 'umn'], immunizationUrl: 'https://boynton.umn.edu/immunization-requirements', commonRequirementTags: commonTags, notes: 'Boynton Health at the University of Minnesota lists immunization requirements.' },
  { name: 'University of Iowa', aliases: ['university of iowa', 'uiowa'], immunizationUrl: 'https://studenthealth.uiowa.edu/services/immunizations', commonRequirementTags: commonTags, notes: 'University of Iowa Student Health provides immunization information.' },
  { name: 'Iowa State University', aliases: ['iowa state', 'iastate'], immunizationUrl: 'https://health.iastate.edu/new-students/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Iowa State Thielen Student Health Center publishes immunization requirements.' },
  { name: 'Indiana University Bloomington', aliases: ['indiana university', 'iu bloomington', 'iu'], immunizationUrl: 'https://healthcenter.indiana.edu/immunization-requirements/index.html', commonRequirementTags: commonTags, notes: 'IU Student Health Center publishes immunization requirements.' },
  { name: 'Ohio State University', aliases: ['ohio state', 'osu'], immunizationUrl: 'https://shs.osu.edu/services/immunizations', commonRequirementTags: commonTags, notes: 'Ohio State Student Health Services provides immunization information.' },
  { name: 'Penn State University', aliases: ['penn state', 'psu'], immunizationUrl: 'https://studentaffairs.psu.edu/health-wellness/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'Penn State University Health Services provides immunization information.' },
  { name: 'University of Pittsburgh', aliases: ['university of pittsburgh', 'pitt'], immunizationUrl: 'https://www.studentaffairs.pitt.edu/student-health-services/immunizations', commonRequirementTags: commonTags, notes: 'Pitt Student Health Services provides immunization information.' },
  { name: 'Carnegie Mellon University', aliases: ['carnegie mellon', 'cmu'], immunizationUrl: 'https://www.cmu.edu/health-services/new-students/immunizations.html', commonRequirementTags: commonTags, notes: 'CMU University Health Services publishes immunization information for new students.' },
  { name: 'Syracuse University', aliases: ['syracuse'], immunizationUrl: 'https://experience.syracuse.edu/bewell/immunization-requirements/', commonRequirementTags: commonTags, notes: 'Syracuse University publishes immunization requirements through Barnes Center resources.' },
  { name: 'University of Rochester', aliases: ['university of rochester', 'rochester'], immunizationUrl: 'https://www.rochester.edu/uhs/primary-care/immunizations/', commonRequirementTags: commonTags, notes: 'University Health Service at Rochester provides immunization information.' },
  { name: 'University at Buffalo', aliases: ['university at buffalo', 'buffalo', 'ub'], immunizationUrl: 'https://www.buffalo.edu/studentlife/life-on-campus/health/medical-care/immunization-requirements.html', commonRequirementTags: commonTags, notes: 'University at Buffalo provides immunization requirements through Student Life.' },
  { name: 'Rutgers University', aliases: ['rutgers'], immunizationUrl: 'https://health.rutgers.edu/general-resources/immunizations/', commonRequirementTags: commonTags, notes: 'Rutgers Student Health publishes immunization information.' },
  { name: 'The College of New Jersey', aliases: ['tcnj', 'college of new jersey'], immunizationUrl: 'https://health.tcnj.edu/requirements/immunization-requirements/', commonRequirementTags: commonTags, notes: 'TCNJ Student Health Services publishes immunization requirements.' },
  { name: 'University of Maryland', aliases: ['university of maryland', 'umd'], immunizationUrl: 'https://health.umd.edu/immunizations', commonRequirementTags: commonTags, notes: 'University of Maryland Health Center provides immunization information.' },
  { name: 'George Washington University', aliases: ['george washington', 'gwu'], immunizationUrl: 'https://healthcenter.gwu.edu/immunizations', commonRequirementTags: commonTags, notes: 'GW Student Health Center provides immunization information.' },
  { name: 'American University', aliases: ['american university'], immunizationUrl: 'https://www.american.edu/ocl/healthcenter/immunization-requirements.cfm', commonRequirementTags: commonTags, notes: 'American University Student Health Center publishes immunization requirements.' },
  { name: 'University of California Berkeley', aliases: ['uc berkeley', 'berkeley', 'cal'], immunizationUrl: 'https://uhs.berkeley.edu/requirements', commonRequirementTags: commonTags, notes: 'UC Berkeley University Health Services publishes requirements.' },
  { name: 'UC Davis', aliases: ['uc davis', 'ucdavis'], immunizationUrl: 'https://shcs.ucdavis.edu/health-and-wellness/medical-services/immunizations', commonRequirementTags: commonTags, notes: 'UC Davis Student Health and Counseling Services provides immunization information.' },
  { name: 'UC San Diego', aliases: ['uc san diego', 'ucsd'], immunizationUrl: 'https://studenthealth.ucsd.edu/resources/health-requirements/index.html', commonRequirementTags: commonTags, notes: 'UC San Diego Student Health publishes health requirements.' },
  { name: 'UC Santa Cruz', aliases: ['uc santa cruz', 'ucsc'], immunizationUrl: 'https://healthcenter.ucsc.edu/information/immunization-requirements.html', commonRequirementTags: commonTags, notes: 'UC Santa Cruz Student Health Center publishes immunization requirements.' },
  { name: 'San Diego State University', aliases: ['san diego state', 'sdsu'], immunizationUrl: 'https://sacd.sdsu.edu/student-health-services/immunizations', commonRequirementTags: commonTags, notes: 'SDSU Student Health Services provides immunization information.' },
  { name: 'San Jose State University', aliases: ['san jose state', 'sjsu'], immunizationUrl: 'https://www.sjsu.edu/medical/services/immunizations.php', commonRequirementTags: commonTags, notes: 'SJSU Student Wellness Center provides immunization information.' },
  { name: 'Cal Poly San Luis Obispo', aliases: ['cal poly', 'cal poly slo'], immunizationUrl: 'https://chw.calpoly.edu/health/immunizations', commonRequirementTags: commonTags, notes: 'Cal Poly Campus Health and Wellbeing provides immunization information.' },
  { name: 'University of San Francisco', aliases: ['university of san francisco', 'usfca'], immunizationUrl: 'https://myusf.usfca.edu/hps/immunization-requirements', commonRequirementTags: commonTags, notes: 'USF Health Promotion Services publishes immunization requirements.' },
  { name: 'Santa Clara University', aliases: ['santa clara', 'scu'], immunizationUrl: 'https://www.scu.edu/cowell/health-requirements/', commonRequirementTags: commonTags, notes: 'Santa Clara Cowell Center publishes health requirements.' },
  { name: 'University of Notre Dame', aliases: ['notre dame'], immunizationUrl: 'https://uhs.nd.edu/services/immunizations/', commonRequirementTags: commonTags, notes: 'Notre Dame University Health Services provides immunization information.' },
  { name: 'Michigan State University', aliases: ['michigan state', 'msu'], immunizationUrl: 'https://olin.msu.edu/services/immunizations.html', commonRequirementTags: commonTags, notes: 'MSU Olin Health Center provides immunization information.' },
  { name: 'Wayne State University', aliases: ['wayne state'], immunizationUrl: 'https://health.wayne.edu/immunizations', commonRequirementTags: commonTags, notes: 'Wayne State Campus Health provides immunization information.' },
  { name: 'Case Western Reserve University', aliases: ['case western', 'cwru'], immunizationUrl: 'https://case.edu/studentlife/healthcounseling/student-wellness/immunizations', commonRequirementTags: commonTags, notes: 'CWRU University Health and Counseling Services provides immunization information.' },
  { name: 'Vanderbilt University', aliases: ['vanderbilt'], immunizationUrl: 'https://www.vumc.org/student-health/immunization-requirements', commonRequirementTags: commonTags, notes: 'Vanderbilt Student Health Center publishes immunization requirements.' },
  { name: 'Tulane University', aliases: ['tulane'], immunizationUrl: 'https://campushealth.tulane.edu/health-center/immunizations', commonRequirementTags: commonTags, notes: 'Tulane Campus Health provides immunization information.' },
  { name: 'Louisiana State University', aliases: ['lsu', 'louisiana state'], immunizationUrl: 'https://www.lsu.edu/shc/medical/immunizations.php', commonRequirementTags: commonTags, notes: 'LSU Student Health Center provides immunization information.' },
  { name: 'University of Alabama', aliases: ['university of alabama', 'ua'], immunizationUrl: 'https://shc.sa.ua.edu/immunizations/', commonRequirementTags: commonTags, notes: 'University of Alabama Student Health Center provides immunization information.' },
  { name: 'Auburn University', aliases: ['auburn'], immunizationUrl: 'https://cws.auburn.edu/aumc/pm/immunizations', commonRequirementTags: commonTags, notes: 'Auburn Medical Clinic provides immunization information.' },
  { name: 'University of South Carolina', aliases: ['university of south carolina', 'south carolina', 'usc columbia'], immunizationUrl: 'https://sc.edu/about/offices_and_divisions/health_services/medical-services/immunizations/index.php', commonRequirementTags: commonTags, notes: 'University of South Carolina Health Services provides immunization information.' },
  { name: 'Clemson University', aliases: ['clemson'], immunizationUrl: 'https://www.clemson.edu/campus-life/student-health/immunizations.html', commonRequirementTags: commonTags, notes: 'Clemson Student Health Services provides immunization information.' },
  { name: 'University of Kansas', aliases: ['university of kansas', 'ku'], immunizationUrl: 'https://studenthealth.ku.edu/immunizations', commonRequirementTags: commonTags, notes: 'KU Watkins Health Services provides immunization information.' },
  { name: 'Kansas State University', aliases: ['kansas state', 'ksu'], immunizationUrl: 'https://www.k-state.edu/lafene/services/immunizations.html', commonRequirementTags: commonTags, notes: 'K-State Lafene Health Center provides immunization information.' },
  { name: 'University of Missouri', aliases: ['university of missouri', 'mizzou'], immunizationUrl: 'https://studenthealth.missouri.edu/immunizations/', commonRequirementTags: commonTags, notes: 'Mizzou Student Health Center provides immunization information.' },
  { name: 'Washington University in St. Louis', aliases: ['washu', 'washington university in st louis'], immunizationUrl: 'https://students.wustl.edu/immunizations/', commonRequirementTags: commonTags, notes: 'WashU Student Health Services provides immunization information.' },
  { name: 'University of Nebraska-Lincoln', aliases: ['university of nebraska', 'unl'], immunizationUrl: 'https://health.unl.edu/immunizations', commonRequirementTags: commonTags, notes: 'UNL University Health Center provides immunization information.' },
  { name: 'University of Oklahoma', aliases: ['university of oklahoma', 'ou'], immunizationUrl: 'https://www.ou.edu/healthservices/immunizations', commonRequirementTags: commonTags, notes: 'OU Health Services provides immunization information.' },
  { name: 'Oklahoma State University', aliases: ['oklahoma state', 'osu stillwater'], immunizationUrl: 'https://uhs.okstate.edu/immunizations/', commonRequirementTags: commonTags, notes: 'OSU University Health Services provides immunization information.' },
  { name: 'University of New Mexico', aliases: ['university of new mexico', 'unm'], immunizationUrl: 'https://shac.unm.edu/services/immunizations.html', commonRequirementTags: commonTags, notes: 'UNM Student Health and Counseling provides immunization information.' },
  { name: 'University of Nevada Las Vegas', aliases: ['unlv', 'university of nevada las vegas'], immunizationUrl: 'https://www.unlv.edu/studentwellness/immunizations', commonRequirementTags: commonTags, notes: 'UNLV Student Wellness provides immunization information.' },
  { name: 'University of Idaho', aliases: ['university of idaho', 'uidaho'], immunizationUrl: 'https://www.uidaho.edu/current-students/student-health-services/clinic/services/immunizations', commonRequirementTags: commonTags, notes: 'University of Idaho Student Health Services provides immunization information.' },
  { name: 'Boise State University', aliases: ['boise state'], immunizationUrl: 'https://www.boisestate.edu/healthservices/immunizations/', commonRequirementTags: commonTags, notes: 'Boise State Health Services provides immunization information.' },
  { name: 'University of Montana', aliases: ['university of montana', 'umontana'], immunizationUrl: 'https://www.umt.edu/curry-health-center/medical/immunizations/', commonRequirementTags: commonTags, notes: 'University of Montana Curry Health Center provides immunization information.' },
  { name: 'Montana State University', aliases: ['montana state', 'msu bozeman'], immunizationUrl: 'https://www.montana.edu/health/immunizations/', commonRequirementTags: commonTags, notes: 'Montana State Student Health Services provides immunization information.' },
] as const;

const vaccineContextTerms = [
  'vaccine',
  'vaccines',
  'vaccination',
  'immunization',
  'immunisation',
  'requirement',
  'requirements',
  'required',
  'student health',
  'health requirement',
  'health requirements',
  'medical requirement',
  'medical requirements',
  'health form',
  'health forms',
  'meningitis',
  'meningococcal',
  'shot',
  'shots',
  'mmr',
  'tdap',
  'hepatitis',
  'varicella',
  '疫苗',
  '免疫',
  '接种',
  '要求',
];

const educationContextTerms = [
  'university',
  'college',
  'school',
  'campus',
  'student',
  'freshman',
  'incoming',
  '大学',
  '学校',
  '学生',
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasPhrase(normalizedQuery: string, normalizedPhrase: string) {
  if (!normalizedPhrase) return false;
  return ` ${normalizedQuery} `.includes(` ${normalizedPhrase} `);
}

function hasAnyContext(normalizedQuery: string, terms: string[]) {
  return terms.some(term => hasPhrase(normalizedQuery, normalizeText(term)));
}

function getUniversityScore(school: UniversityRecord, normalizedQuery: string) {
  const hasVaccineContext = hasAnyContext(normalizedQuery, vaccineContextTerms);
  const hasEducationContext = hasAnyContext(normalizedQuery, educationContextTerms);
  const allNames = [school.name, ...school.aliases];

  return allNames.reduce((bestScore, name) => {
    const normalizedName = normalizeText(name);
    if (!hasPhrase(normalizedQuery, normalizedName)) return bestScore;

    const isShortAlias = normalizedName.length <= 3;
    if (isShortAlias && !hasVaccineContext && !hasEducationContext) return bestScore;

    const score =
      normalizedName === normalizeText(school.name) ? 100 :
      isShortAlias ? 72 :
      normalizedName.split(' ').length > 1 ? 90 :
      82;

    return Math.max(bestScore, score);
  }, 0);
}

export function hasSchoolVaccineIntent(query: string) {
  const normalized = normalizeText(query);
  return hasAnyContext(normalized, vaccineContextTerms) && hasAnyContext(normalized, educationContextTerms);
}

export function findUniversityByQuery(query: string) {
  const normalized = normalizeText(query);
  const ranked = universities
    .map(school => ({ school, score: getUniversityScore(school, normalized) }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.school;
}

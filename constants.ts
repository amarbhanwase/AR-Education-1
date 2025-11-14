import { User, Role, Question, Test, Ad } from './types.ts';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Student', email: 'student@example.com', role: Role.Student },
  { id: 2, name: 'Amar Bhanavase', email: 'amarbhanavase111@gmail.com', role: Role.Admin },
];

export const CLASS_11_BIOLOGY_CHAPTERS = [
  'Living World',
  'Systematics of Living Organisms',
  'Kingdom Plantae',
  'Kingdom Animalia',
  'Cell Structure and Organization',
  'Biomolecules',
  'Cell Division',
  'Plant Tissues and Anatomy',
  'Morphology of Flowering Plants',
  'Animal Tissue',
  'Study of Animal Type : Cockroach',
  'Photosynthesis',
  'Respiration and Energy Transfer',
  'Human Nutrition',
  'Excretion and Osmoregulation',
  'Skeleton and Movement',
];

export const CLASS_12_BIOLOGY_CHAPTERS = [
  'Reproduction in Lower and Higher Plants',
  'Reproduction in Lower and Higher Animals',
  'Inheritance and Variation',
  'Molecular Basis of Inheritance',
  'Origin and Evolution of Life',
  'Plant Water Relation',
  'Plant Growth and Mineral Nutrition',
  'Respiration and Circulation',
  'Control and Co-ordination',
  'Human Health and Diseases',
  'Enhancement of Food Production',
  'Biotechnology',
  'Organisms and Populations',
  'Ecosystems and Energy Flow',
  'Biodiversity, Conservation and environmental issues',
];

export let MOCK_QUESTIONS: Question[] = [
  // Class 11
  { id: 'lw1', chapter: 'Living World', topic: 'Basics', text: 'Which is the defining characteristic of living beings?', options: ['Growth', 'Reproduction', 'Metabolism', 'Consciousness'], correctAnswer: 'Consciousness' },
  { id: 'lw2', chapter: 'Living World', topic: 'Taxonomy', text: 'What is the basic unit of classification?', options: ['Genus', 'Species', 'Family', 'Order'], correctAnswer: 'Species' },

  { id: 'slo1', chapter: 'Systematics of Living Organisms', topic: 'Taxonomy', text: 'Who introduced the binomial nomenclature system?', options: ['Charles Darwin', 'Gregor Mendel', 'Carolus Linnaeus', 'Robert Hooke'], correctAnswer: 'Carolus Linnaeus' },
  { id: 'slo2', chapter: 'Systematics of Living Organisms', topic: 'Classification', text: 'The five-kingdom classification was proposed by:', options: ['R.H. Whittaker', 'Carl Woese', 'Ernst Haeckel', 'Copeland'], correctAnswer: 'R.H. Whittaker' },

  { id: 'kp1', chapter: 'Kingdom Plantae', topic: 'Algae', text: 'Algae are characterized by a ___ body.', options: ['Thalloid', 'Differentiated', 'Vascular', 'Rooted'], correctAnswer: 'Thalloid' },
  { id: 'kp2', chapter: 'Kingdom Plantae', topic: 'Bryophytes', text: 'Which of these are called amphibians of the plant kingdom?', options: ['Algae', 'Fungi', 'Bryophytes', 'Pteridophytes'], correctAnswer: 'Bryophytes' },

  { id: 'ka1', chapter: 'Kingdom Animalia', topic: 'Phylum', text: 'Which phylum is characterized by the presence of a water vascular system?', options: ['Arthropoda', 'Mollusca', 'Echinodermata', 'Annelida'], correctAnswer: 'Echinodermata' },
  { id: 'ka2', chapter: 'Kingdom Animalia', topic: 'Classification', text: 'Cold-blooded animals are also known as:', options: ['Poikilotherms', 'Homeotherms', 'Endotherms', 'Stenotherms'], correctAnswer: 'Poikilotherms' },

  { id: 'cso1', chapter: 'Cell Structure and Organization', topic: 'Cell Theory', text: 'Who proposed the cell theory?', options: ['Watson and Crick', 'Schleiden and Schwann', 'Robert Hooke', 'Leeuwenhoek'], correctAnswer: 'Schleiden and Schwann' },
  { id: 'cso2', chapter: 'Cell Structure and Organization', topic: 'Organelles', text: 'Which organelle is known as the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Golgi apparatus'], correctAnswer: 'Mitochondrion' },
  { id: 'cso3', chapter: 'Cell Structure and Organization', topic: 'Organelles', text: 'Which of these is not found in an animal cell?', options: ['Cell wall', 'Mitochondrion', 'Nucleus', 'Cell membrane'], correctAnswer: 'Cell wall' },

  { id: 'b1', chapter: 'Biomolecules', topic: 'Carbohydrates', text: 'Which of the following is a monosaccharide?', options: ['Sucrose', 'Lactose', 'Glucose', 'Maltose'], correctAnswer: 'Glucose' },
  { id: 'b2', chapter: 'Biomolecules', topic: 'Proteins', text: 'Enzymes are primarily made of which biomolecule?', options: ['Carbohydrates', 'Lipids', 'Proteins', 'Nucleic acids'], correctAnswer: 'Proteins' },

  { id: 'cd1', chapter: 'Cell Division', topic: 'Mitosis', text: 'In which phase of mitosis do chromosomes align at the metaphase plate?', options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], correctAnswer: 'Metaphase' },
  { id: 'cd2', chapter: 'Cell Division', topic: 'Meiosis', text: 'Crossing over occurs during which phase of meiosis?', options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Prophase II'], correctAnswer: 'Prophase I' },

  { id: 'pta1', chapter: 'Plant Tissues and Anatomy', topic: 'Tissues', text: 'Which plant tissue provides mechanical support?', options: ['Parenchyma', 'Collenchyma', 'Sclerenchyma', 'Both B and C'], correctAnswer: 'Both B and C' },
  { id: 'pta2', chapter: 'Plant Tissues and Anatomy', topic: 'Vascular Bundles', text: 'Xylem is primarily responsible for the transport of:', options: ['Food', 'Water and minerals', 'Hormones', 'Gases'], correctAnswer: 'Water and minerals' },

  { id: 'mfp1', chapter: 'Morphology of Flowering Plants', topic: 'Root', text: 'The tap root system originates from the:', options: ['Radicle', 'Plumule', 'Cotyledon', 'Endosperm'], correctAnswer: 'Radicle' },
  { id: 'mfp2', chapter: 'Morphology of Flowering Plants', topic: 'Flower', text: 'The male reproductive part of a flower is the:', options: ['Pistil', 'Stamen', 'Petal', 'Sepal'], correctAnswer: 'Stamen' },

  { id: 'at1', chapter: 'Animal Tissue', topic: 'Epithelial Tissue', text: 'Which tissue lines the inner surface of the stomach and intestine?', options: ['Squamous epithelium', 'Columnar epithelium', 'Cuboidal epithelium', 'Ciliated epithelium'], correctAnswer: 'Columnar epithelium' },
  { id: 'at2', chapter: 'Animal Tissue', topic: 'Connective Tissue', text: 'Blood is a type of:', options: ['Epithelial tissue', 'Connective tissue', 'Muscular tissue', 'Nervous tissue'], correctAnswer: 'Connective tissue' },
  
  { id: 'satc1', chapter: 'Study of Animal Type : Cockroach', topic: 'Anatomy', text: 'How many chambers are present in the heart of a cockroach?', options: ['4', '10', '13', '2'], correctAnswer: '13' },
  { id: 'satc2', chapter: 'Study of Animal Type : Cockroach', topic: 'Excretion', text: 'The excretory organs of a cockroach are:', options: ['Nephridia', 'Flame cells', 'Malpighian tubules', 'Green glands'], correctAnswer: 'Malpighian tubules' },

  { id: 'p1', chapter: 'Photosynthesis', topic: 'Process', text: 'Which pigment is essential for photosynthesis?', options: ['Carotene', 'Xanthophyll', 'Chlorophyll', 'Anthocyanin'], correctAnswer: 'Chlorophyll' },
  { id: 'p2', chapter: 'Photosynthesis', topic: 'Light Reaction', text: 'The light-dependent reactions of photosynthesis occur in the:', options: ['Stroma', 'Thylakoid membrane', 'Cytoplasm', 'Mitochondria'], correctAnswer: 'Thylakoid membrane' },

  { id: 'ret1', chapter: 'Respiration and Energy Transfer', topic: 'Glycolysis', text: 'Glycolysis occurs in the:', options: ['Mitochondria', 'Cytoplasm', 'Nucleus', 'Ribosome'], correctAnswer: 'Cytoplasm' },
  { id: 'ret2', chapter: 'Respiration and Energy Transfer', topic: 'ATP', text: 'The energy currency of the cell is:', options: ['ADP', 'ATP', 'NADH', 'Glucose'], correctAnswer: 'ATP' },

  { id: 'hn1', chapter: 'Human Nutrition', topic: 'Digestion', text: 'Protein digestion begins in the:', options: ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'], correctAnswer: 'Stomach' },
  { id: 'hn2', chapter: 'Human Nutrition', topic: 'Vitamins', text: 'Which vitamin deficiency causes scurvy?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], correctAnswer: 'Vitamin C' },
  
  { id: 'eo1', chapter: 'Excretion and Osmoregulation', topic: 'Kidney', text: 'The functional unit of the kidney is the:', options: ['Neuron', 'Nephron', 'Alveolus', 'Sarcomere'], correctAnswer: 'Nephron' },
  { id: 'eo2', chapter: 'Excretion and Osmoregulation', topic: 'Urine Formation', text: 'The process of filtering blood in the glomerulus is called:', options: ['Ultrafiltration', 'Reabsorption', 'Secretion', 'Micturition'], correctAnswer: 'Ultrafiltration' },

  { id: 'sm1', chapter: 'Skeleton and Movement', topic: 'Bones', text: 'How many bones are in the adult human skeleton?', options: ['206', '270', '300', '150'], correctAnswer: '206' },
  { id: 'sm2', chapter: 'Skeleton and Movement', topic: 'Muscles', text: 'The contractile proteins in muscle are:', options: ['Actin and Myosin', 'Collagen and Elastin', 'Keratin and Melanin', 'Hemoglobin and Myoglobin'], correctAnswer: 'Actin and Myosin' },

  // Class 12
  { id: 'rlhp1', chapter: 'Reproduction in Lower and Higher Plants', topic: 'Pollination', text: 'The transfer of pollen from the anther to the stigma is called:', options: ['Fertilization', 'Pollination', 'Germination', 'Dispersal'], correctAnswer: 'Pollination' },
  { id: 'rlhp2', chapter: 'Reproduction in Lower and Higher Plants', topic: 'Flower', text: 'Double fertilization is a characteristic feature of:', options: ['Gymnosperms', 'Angiosperms', 'Pteridophytes', 'Bryophytes'], correctAnswer: 'Angiosperms' },

  { id: 'rlha1', chapter: 'Reproduction in Lower and Higher Animals', topic: 'Human Reproduction', text: 'Fertilization in humans normally occurs in the:', options: ['Ovary', 'Uterus', 'Fallopian tube', 'Vagina'], correctAnswer: 'Fallopian tube' },
  { id: 'rlha2', chapter: 'Reproduction in Lower and Higher Animals', topic: 'Embryology', text: 'The structure that provides nourishment to the developing embryo is the:', options: ['Amnion', 'Chorion', 'Placenta', 'Yolk sac'], correctAnswer: 'Placenta' },

  { id: 'iv1', chapter: 'Inheritance and Variation', topic: 'Mendelian Genetics', text: 'Who is known as the father of genetics?', options: ['Charles Darwin', 'Gregor Mendel', 'James Watson', 'Alfred Wallace'], correctAnswer: 'Gregor Mendel' },
  { id: 'iv2', chapter: 'Inheritance and Variation', topic: 'Genetics', text: 'An individual with two identical alleles for a trait is said to be:', options: ['Heterozygous', 'Homozygous', 'Dominant', 'Recessive'], correctAnswer: 'Homozygous' },

  { id: 'mbi1', chapter: 'Molecular Basis of Inheritance', topic: 'DNA Structure', text: 'What are the building blocks of DNA?', options: ['Amino acids', 'Nucleotides', 'Fatty acids', 'Monosaccharides'], correctAnswer: 'Nucleotides' },
  { id: 'mbi2', chapter: 'Molecular Basis of Inheritance', topic: 'Central Dogma', text: 'The process of synthesizing RNA from a DNA template is called:', options: ['Replication', 'Transcription', 'Translation', 'Transformation'], correctAnswer: 'Transcription' },

  { id: 'oel1', chapter: 'Origin and Evolution of Life', topic: 'Evolution', text: 'The theory of natural selection was proposed by:', options: ['Gregor Mendel', 'Jean-Baptiste Lamarck', 'Charles Darwin', 'Hugo de Vries'], correctAnswer: 'Charles Darwin' },
  { id: 'oel2', chapter: 'Origin and Evolution of Life', topic: 'Evidences', text: 'Homologous organs are those that have:', options: ['Different origin, similar function', 'Similar origin, different function', 'Similar origin, similar function', 'Different origin, different function'], correctAnswer: 'Similar origin, different function' },

  { id: 'pwr1', chapter: 'Plant Water Relation', topic: 'Transport', text: 'The loss of water in the form of vapor from plants is called:', options: ['Guttation', 'Transpiration', 'Bleeding', 'Respiration'], correctAnswer: 'Transpiration' },
  { id: 'pwr2', chapter: 'Plant Water Relation', topic: 'Osmosis', text: 'The movement of water across a semipermeable membrane is:', options: ['Diffusion', 'Imbibition', 'Osmosis', 'Active transport'], correctAnswer: 'Osmosis' },

  { id: 'pgmn1', chapter: 'Plant Growth and Mineral Nutrition', topic: 'Hormones', text: 'Which plant hormone is responsible for apical dominance?', options: ['Auxin', 'Gibberellin', 'Cytokinin', 'Ethylene'], correctAnswer: 'Auxin' },
  { id: 'pgmn2', chapter: 'Plant Growth and Mineral Nutrition', topic: 'Nutrition', text: 'Which of the following is a macronutrient for plants?', options: ['Zinc', 'Copper', 'Nitrogen', 'Manganese'], correctAnswer: 'Nitrogen' },

  { id: 'rc1', chapter: 'Respiration and Circulation', topic: 'Circulation', text: 'Which chamber of the human heart receives oxygenated blood from the lungs?', options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'], correctAnswer: 'Left atrium' },
  { id: 'rc2', chapter: 'Respiration and Circulation', topic: 'Respiration', text: 'The exchange of gases in the lungs occurs in the:', options: ['Bronchi', 'Trachea', 'Alveoli', 'Bronchioles'], correctAnswer: 'Alveoli' },

  { id: 'cc1', chapter: 'Control and Co-ordination', topic: 'Nervous System', text: 'The structural and functional unit of the nervous system is the:', options: ['Nephron', 'Neuron', 'Sarcomere', 'Osteon'], correctAnswer: 'Neuron' },
  { id: 'cc2', chapter: 'Control and Co-ordination', topic: 'Endocrine System', text: 'Which gland is known as the master gland?', options: ['Thyroid gland', 'Adrenal gland', 'Pituitary gland', 'Pancreas'], correctAnswer: 'Pituitary gland' },

  { id: 'hhd1', chapter: 'Human Health and Diseases', topic: 'Immunity', text: 'Vaccination is an example of which type of immunity?', options: ['Innate immunity', 'Passive immunity', 'Active immunity', 'Natural immunity'], correctAnswer: 'Active immunity' },
  { id: 'hhd2', chapter: 'Human Health and Diseases', topic: 'Diseases', text: 'AIDS is caused by which virus?', options: ['Influenza virus', 'Varicella-zoster virus', 'Human Immunodeficiency Virus (HIV)', 'Hepatitis B virus'], correctAnswer: 'Human Immunodeficiency Virus (HIV)' },

  { id: 'efp1', chapter: 'Enhancement of Food Production', topic: 'Animal Husbandry', text: 'The process of rearing honey bees for honey is called:', options: ['Apiculture', 'Sericulture', 'Pisciculture', 'Aquaculture'], correctAnswer: 'Apiculture' },
  { id: 'efp2', chapter: 'Enhancement of Food Production', topic: 'Plant Breeding', text: 'The Green Revolution is primarily associated with the development of:', options: ['High-yield crop varieties', 'Organic farming', 'Dairy products', 'Fisheries'], correctAnswer: 'High-yield crop varieties' },

  { id: 'btech1', chapter: 'Biotechnology', topic: 'Tools', text: 'Which enzymes are used as "molecular scissors" in genetic engineering?', options: ['Ligases', 'Polymerases', 'Restriction enzymes', 'Helicases'], correctAnswer: 'Restriction enzymes' },
  { id: 'btech2', chapter: 'Biotechnology', topic: 'Applications', text: 'PCR stands for:', options: ['Protein Chain Reaction', 'Polymerase Chain Reaction', 'Polypeptide Chain Reaction', 'Primary Cell Reaction'], correctAnswer: 'Polymerase Chain Reaction' },

  { id: 'op1', chapter: 'Organisms and Populations', topic: 'Ecology', text: 'The study of the interaction between organisms and their environment is called:', options: ['Physiology', 'Ecology', 'Genetics', 'Taxonomy'], correctAnswer: 'Ecology' },
  { id: 'op2', chapter: 'Organisms and Populations', topic: 'Interactions', text: 'A symbiotic relationship where both organisms benefit is called:', options: ['Parasitism', 'Commensalism', 'Mutualism', 'Predation'], correctAnswer: 'Mutualism' },

  { id: 'eef1', chapter: 'Ecosystems and Energy Flow', topic: 'Food Chain', text: 'In a food chain, plants are considered:', options: ['Primary consumers', 'Producers', 'Secondary consumers', 'Decomposers'], correctAnswer: 'Producers' },
  // Fix: Corrected a typo in the property name from 'id:t:' to 'id:'.
  { id: 'eef2', chapter: 'Ecosystems and Energy Flow', topic: 'Energy Pyramid', text: 'The 10% law of energy transfer in an ecosystem was proposed by:', options: ['Tansley', 'Odum', 'Lindeman', 'Haeckel'], correctAnswer: 'Lindeman' },
  
  { id: 'bcei1', chapter: 'Biodiversity, Conservation and environmental issues', topic: 'Conservation', text: 'Which of the following is an example of ex-situ conservation?', options: ['National Park', 'Biosphere Reserve', 'Wildlife Sanctuary', 'Botanical Garden'], correctAnswer: 'Botanical Garden' },
  { id: 'bcei2', chapter: 'Biodiversity, Conservation and environmental issues', topic: 'Pollution', text: 'The phenomenon of global warming is primarily caused by an increase in:', options: ['Ozone', 'Carbon dioxide', 'Sulphur dioxide', 'Nitrogen'], correctAnswer: 'Carbon dioxide' },
];

export const MOCK_TESTS: Test[] = [
    { id: 't1', title: 'Mid-Term Cell Biology Challenge', chapter: 'Cell Structure and Organization', timeLimit: 5, questionIds: ['cso1', 'cso2', 'cso3'] },
];

export const MOCK_ADS: Ad[] = [
  {
    id: 1,
    title: 'SuperCharge Your Brain!',
    description: 'Try our new focus-enhancing supplement. Made with all-natural ingredients.',
    imageUrl: 'https://picsum.photos/seed/ad1/200/200',
    link: '#',
  },
  {
    id: 2,
    title: 'Code Faster with AI',
    description: 'Our AI-powered code assistant helps you write better code, faster.',
    imageUrl: 'https://picsum.photos/seed/ad2/200/200',
    link: '#',
  },
  {
    id: 3,
    title: 'The Ultimate Study Notebook',
    description: 'Organize your notes and ace your exams. Available in 5 colors!',
    imageUrl: 'https://picsum.photos/seed/ad3/200/200',
    link: '#',
  },
];
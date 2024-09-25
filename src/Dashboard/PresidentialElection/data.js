import ptiLogo from '../../assets/PTI-logo.png';
import pmlnLogo from '../../assets/pmln.png';
import ppp from '../../assets/ppp.png';
import jamateIslami from '../../assets/jamat-e-islami.png';

export const presidentialCandidatesData = [
  {
    candidateId: 1,
    candidateName: 'Mr. Imran Khan',
    candidateParty: 'Pakistan Tehreek Insaf',
    candidatePartyShort: 'PTI',
    candidateImage: ptiLogo,
  },
  {
    candidateId: 2,
    candidateName: 'Mr. Bilawal Bhutto Zardari',
    candidateParty: 'Pakistan Peoples Party',
    candidateParyShort: 'PPP',
    candidateImage: ppp,
  },
  {
    candidateId: 3,
    candidateName: 'Mr. Shabaz Sharif',
    candidatePartyShort: 'PML(N)',
    candidateParty: 'Pakistan Muslim League (N)',
    candidateImage: pmlnLogo,
  },
  {
    candidateId: 4,
    candidateName: 'Mr. Siraj ul Haq',
    candidateParty: 'Jamaat-e-Islami Pakistan',
    candidatePartyShort: 'Ji',
    candidateImage: jamateIslami,
  },
];

export default presidentialCandidatesData;

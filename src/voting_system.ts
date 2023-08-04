interface VoterList{
    voters: Voter[],
    voter_counter: number
}
interface Voter{
    voter_id: number,
    name: string,
    vote_given: boolean
}
interface CandidateList{
    candidates: Candidate[],
    candidate_counter: number
}
interface Candidate{
    candidate_id: number, 
    name: string,
    votes_taken: number
}

var list_of_candidates:CandidateList = {
    candidates: [],
    candidate_counter: 0
};
var list_of_voters:VoterList = {
    voters: [],
    voter_counter: 0
};

function create_candidate(name: string){
    list_of_candidates.candidate_counter = list_of_candidates.candidate_counter + 1;
    let newCandidate:Candidate = {
        candidate_id: list_of_candidates.candidate_counter,
        name: name,
        votes_taken: 0
    };
    list_of_candidates.candidates.push(newCandidate);
}
create_candidate("a");
create_candidate("b");
create_candidate("c");
function create_voter(name:string){
    list_of_voters.voter_counter = list_of_voters.voter_counter + 1;
    let newVoter: Voter = {
        voter_id: list_of_voters.voter_counter,
        name,
        vote_given: false  
    };
    list_of_voters.voters.push(newVoter);
}
create_voter("x");
create_voter("y");
create_voter("z");

function findVoterIndex(array:Voter[], target_id: number){
    for(let i=0; i<array.length; i++){
        if(array[i]['voter_id'] == target_id){
            return i
        }
    }
    return -1;
}
function findCandidateIndex(array:Candidate[], target_id: number){
    for(let i=0; i<array.length; i++){
        if(array[i]['candidate_id'] == target_id){
            return i
        }
    }
    return -1;
}
function give_vote(voter_id:number, candidate_id: number){
    let voterIndex = findVoterIndex(list_of_voters.voters, voter_id);
    let candidateIndex = findCandidateIndex(list_of_candidates.candidates, candidate_id);
    if(list_of_voters.voters[voterIndex]['vote_given'] == true){
        return;
    }
    list_of_voters.voters[voterIndex]['vote_given'] = true;
    list_of_candidates.candidates[candidateIndex]['votes_taken'] = list_of_candidates.candidates[candidateIndex]['votes_taken'] + 1;
}
give_vote(1,2);
give_vote(2,2);
give_vote(3,1);
function sort_by_max_votes(){
    list_of_candidates.candidates.sort((a: Candidate, b: Candidate) => b.votes_taken - a.votes_taken);;
}
sort_by_max_votes()
console.log(list_of_candidates)
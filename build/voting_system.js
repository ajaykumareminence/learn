"use strict";
var list_of_candidates = {
    candidates: [],
    candidate_counter: 0
};
var list_of_voters = {
    voters: [],
    voter_counter: 0
};
function create_candidate(name) {
    list_of_candidates.candidate_counter = list_of_candidates.candidate_counter + 1;
    let newCandidate = {
        candidate_id: list_of_candidates.candidate_counter,
        name: name,
        votes_taken: 0
    };
    list_of_candidates.candidates.push(newCandidate);
}
create_candidate("a");
create_candidate("b");
create_candidate("c");
function create_voter(name) {
    list_of_voters.voter_counter = list_of_voters.voter_counter + 1;
    let newVoter = {
        voter_id: list_of_voters.voter_counter,
        name,
        vote_given: false
    };
    list_of_voters.voters.push(newVoter);
}
create_voter("x");
create_voter("y");
create_voter("z");
function findVoterIndex(array, target_id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['voter_id'] == target_id) {
            return i;
        }
    }
    return -1;
}
function findCandidateIndex(array, target_id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]['candidate_id'] == target_id) {
            return i;
        }
    }
    return -1;
}
function give_vote(voter_id, candidate_id) {
    let voterIndex = findVoterIndex(list_of_voters.voters, voter_id);
    let candidateIndex = findCandidateIndex(list_of_candidates.candidates, candidate_id);
    if (list_of_voters.voters[voterIndex]['vote_given'] == true) {
        return;
    }
    list_of_voters.voters[voterIndex]['vote_given'] = true;
    list_of_candidates.candidates[candidateIndex]['votes_taken'] = list_of_candidates.candidates[candidateIndex]['votes_taken'] + 1;
}
give_vote(1, 2);
give_vote(2, 2);
give_vote(3, 1);
function sort_by_max_votes() {
    list_of_candidates.candidates.sort((a, b) => b.votes_taken - a.votes_taken);
    ;
}
sort_by_max_votes();
console.log(list_of_candidates);

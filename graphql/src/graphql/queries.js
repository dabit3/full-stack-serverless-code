// eslint-disable
// this is an auto generated file. This will be overwritten

export const getNote = `query GetNote($id: ID!) {
  getNote(id: $id) {
    id
    clientId
    name
    description
    completed
  }
}
`;
export const listNotes = `query ListNotes(
  $filter: ModelNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      clientId
      name
      description
      completed
    }
    nextToken
  }
}
`;

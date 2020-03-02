/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listStages = /* GraphQL */ `
  query ListStages(
    $filter: ModelStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        performances {
          items {
            id
            time
            performer
            description
          }
        }
      }
      nextToken
    }
  }
`;
export const getStage = /* GraphQL */ `
  query GetStage($id: ID!) {
    getStage(id: $id) {
      id
      name
      performances {
        items {
          id
          performanceStageId
          productID
          performer
          imageUrl
          description
          time
        }
        nextToken
      }
    }
  }
`;
export const getPerformance = /* GraphQL */ `
  query GetPerformance($id: ID!) {
    getPerformance(id: $id) {
      id
      performanceStageId
      productID
      performer
      imageUrl
      description
      time
      stage {
        id
        name
        performances {
          nextToken
        }
      }
    }
  }
`;
export const listPerformances = /* GraphQL */ `
  query ListPerformances(
    $filter: ModelPerformanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPerformances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        performanceStageId
        productID
        performer
        imageUrl
        description
        time
        stage {
          id
          name
        }
      }
      nextToken
    }
  }
`;

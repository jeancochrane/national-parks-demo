import React from "react"
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector"
import { Layout, SingleSelectFacet, BooleanFacet } from "@elastic/react-search-ui-views"
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  WithSearch,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  Results,
  SearchBox
} from "@elastic/react-search-ui"

import Result from "../components/result"
import SEO from "../components/seo"

const SearchPage = () => (
  <>
    <SEO title="Search" />
    <SearchProvider
      config={{
        apiConnector: new AppSearchAPIConnector({
          searchKey: "search-wk7ttbkdzwktei6xdjqtqou1",
          engineName: "national-parks-demo",
          hostIdentifier: "host-fovyc9"
        }),
        searchQuery: {
          facets: {
            states: {type: "value", size: 30},
            world_heritage_site: {type: "value"},
            visitors: {
              type: "range",
              ranges: [
                {from: 0, to: 1000000, name: "0 to 1 million"},
                {from: 1000000, to: 2000000, name: "1-2 million"},
                {from: 2000000, to: 3000000, name: "2-3 million"},
                {from: 3000000, to: 4000000, name: "3-4 million"},
                {from: 4000000, name: "4+ million"},
              ],
            },
          }
        },
        alwaysSearchOnInitialLoad: true
      }}
    >
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => (
          <div className="App">
            <ErrorBoundary>
              <Layout
                header={
                  <>
                    <h1
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                        marginTop: '0'
                      }}>
                      Search for a national park
                    </h1>
                    <SearchBox
                      autocompleteMinimumCharacters={3}
                      autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "title",
                        urlField: "nps_link",
                      }}
                      autocompleteSuggestions={true}
                    />
                  </>
                }
                sideContent={
                  <>
                    <Sorting
                      label={"Sort by"}
                      sortOptions={[
                        {
                          name: "Relevance",
                          value: "",
                          direction: ""
                        },
                        {
                          name: "Title",
                          value: "title",
                          direction: "asc"
                        },
                        {
                          name: "Visitors",
                          value: "visitors",
                          direction: "asc"
                        }
                      ]}
                    />
                    <Facet
                      field="states"
                      label="States"
                      filterType="any"
                      isFilterable={true}
                    />
                    <Facet
                      field="world_heritage_site"
                      label="World Heritage Site?"
                      view={BooleanFacet}
                    />
                    <Facet
                      field="visitors"
                      label="Visitors"
                      view={SingleSelectFacet}
                    />
                  </>
                }
                bodyHeader={
                  <>
                    {wasSearched && <PagingInfo/>}
                    {wasSearched && <ResultsPerPage/>}
                  </>
                }
                bodyContent={
                  <Results
                    resultView={({ className, result, onClickLink, titleField, urlField }) => {
                      const opts = { result, onClickLink, titleField, urlField }
                      return (<Result {...opts} />)
                    }}
                    titleField="title"
                    urlField="nps_link"
                  />
                }
                bodyFooter={<Paging/>}
              />
            </ErrorBoundary>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  </>
)

export default SearchPage

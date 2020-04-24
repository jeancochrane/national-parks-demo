// Fix for messed up package.json in search-ui-views -- see:
// https://github.com/gatsbyjs/gatsby/issues/19446#issuecomment-552982955
import styles from "@elastic/react-search-ui-views/lib/styles/styles.css"
if (!styles) {console.log('Forcing include of styles')}

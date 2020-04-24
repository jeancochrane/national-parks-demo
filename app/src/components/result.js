import React from "react"

const getRawValue = (result, field) => {
  return result[field] ? result[field].raw : "No raw field found"
}

const getFields = (result, fields) => {
  return Object.keys(result).reduce((acc, field) => {
    // Filter out non-included fields.
    if (field.startsWith('_meta')) { return acc }
    return { ...acc, [field]: getRawValue(result, field) };
  }, {});
}

const Result = ({ result, onClickLink, titleField, urlField }) => {
  const fields = getFields(result)
  const title = getRawValue(result, titleField)
  const url = getRawValue(result, urlField)
  return (
    <li className="sui-result">
      <div className="sui-result__header">
        {title && !url && (
          <span
            className="sui-result__title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {title && url && (
          <a
            className="sui-result__title sui-result__title-link"
            dangerouslySetInnerHTML={{ __html: title }}
            href={url}
            onClick={onClickLink}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
      <div className="sui-result__body">
        <div className="sui-result__details">
          {fields.world_heritage_site && (
            <span style={{background: "lightyellow", padding: "2px", marginBottom: "2px"}}>
              World heritage site
            </span>
          )}
          {fields.description && <p style={{margin: "16px 0"}}>{fields.description}</p>}
          {fields.states && <li><strong>States:</strong> {fields.states.join(', ')}</li>}
          {fields.visitors && <p><strong>Visitors:</strong> {fields.visitors.toLocaleString()}</p>}
        </div>
      </div>
    </li>
  )
}

export default Result

import {useState} from 'react';
import Papa from 'papaparse'; // Alternate: csv-parse
import { mapToTarget, targetFields } from '../modules/mappings.js';

export default function Form() {
  const [selectedFile, setSelectedFile] = useState();
  const [inputHeaders, setInputHeaders] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleOnChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    //console.log(event.target.files[0]);
    // File parsing is async so we need a callback via the 'complete' option key.
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        //console.log(`Delimiter: ${results.meta.delimiter}`);
        setInputHeaders(targetFields());
        setInputValues(mapToTarget(results.data));
      }
    });
  };

  const convertCsv = async (event) => {
    //event.preventDefault();
    const outputSection = document.getElementById("output-section");
    outputSection.style.visibility = "visible";
    let newTable = "<table><thead><tr>"
    inputHeaders.reverse().map((header, idx) => newTable += `<th key=${idx}>${header}</th>`);
    newTable += "</tr></thead><tbody>";
    inputValues.map(
      (valueRow, idx) => {
          newTable += `<tr key=${idx}>`;
          valueRow.reverse().map((val, id) => newTable += `<td key=${id}>${val}</td>`)
          newTable += "</tr>";
      }
    );
    newTable += "</tbody></table>";
    console.log(newTable);
    outputSection.insertAdjacentHTML('afterbegin', newTable);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Don't let client refresh the page.
    //console.log(selectedFile);

    inputHeaders = inputHeaders.reverse();
    inputValues = inputValues.reverse();
    // NOTE: We may not even need to submit this to an API endpoint for this
    // PoC. We could simply parse the CSV via the onChange handler and do stuff.
  };

  return (
    <div className="input">
      <form onSubmit={handleSubmit}>
        <label htmlFor="csv-input-file">
          Upload a CSV file to be converted:&nbsp;
        </label>
        <input id="csv-input-file" type="file" onChange={handleOnChange}/>
        <br/><br/>
        After selecting a file, the first 5 converted rows will be displayed.<br/><br/>
        { selectedFile ? (
            <div>
              <table>
                <thead>
                  <tr>
                    {/* React expects a key attribute for table elements. */}
                    {
                      inputHeaders.map((header, idx) => <th key={idx}>{header}</th>)
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    inputValues.slice(0,5).map(
                      (valueRow, idx) => {
                        return (
                          <tr key={idx}>
                            {valueRow.map((val, id) => <td key={id}>{val}</td>)}
                          </tr>
                        )
                      }
                    )
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )
        }
        <br/><br/>
        <button type="button" onClick={convertCsv}>Convert CSV</button>
      </form>

      <style jsx>{`
        table {
          border: 2px solid;
          border-collapse: collapse;
        }

        thead {
          background-color: lightgrey;
        }

        td, th {
          padding: 2px;
          border: 1px solid;
        }
      `}</style>
    </div>
  );
}

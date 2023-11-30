/* eslint-disable react-native/no-inline-styles */ // REMOVE ME
import { ListView } from '@components';
import { g } from '@styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { DocumentResource } from '@interfaces';

export default function Invoices() {
  // const { data: invoices, isFetching } = useDocumentReferences('invoicefull');
  // const { data: allDocs } = useDocumentReferences();
  const invoices: {entry: DocumentResource[] } = {
    entry:
      [
        {
          resource:
            {
              resourceType: 'DocumentReference',
              id: '1cd418c3-3d7b-4b6e-a5d5-75efc9eae27e',
              status: 'current',
              type:
                {
                  coding:
                    [
                      {
                        system: 'http://loinc.org',
                        code: '11502-2',
                        display: 'Laboratory report'
                      }
                    ]
                },
              category:
                [
                  {
                    coding:
                      [
                        {
                          code: 'labreport'
                        }
                      ]
                  }
                ],
              subject:
                {
                  reference: 'Patient/cfd91cd3bd9046db81199aa8ee4afd7f',
                  type: 'Patient'
                },
              date: '2023-09-18T00:00:00+00:00',
              author:
                [
                  {
                    reference: 'Practitioner/4150cd20de8a470aa570a852859ac87e',
                    type: 'Practitioner'
                  }
                ],
              custodian:
                {
                  reference: 'Organization/00000000-0000-0000-0002-000000000000',
                  type: 'Organization'
                },
              content:
                [
                  {
                    attachment:
                      {
                        contentType: 'application/pdf',
                        url: 'https://pdfobject.com/pdf/sample.pdf',
                      },
                    format:
                      {
                        system: 'http://ihe.net/fhir/ValueSet/IHE.FormatCode.codesystem',
                        code: 'urn:ihe:iti:xds:2017:mimeTypeSufficient',
                        display: 'mimeType Sufficient'
                      }
                  }
                ],
              context:
                {
                  encounter:
                    [
                      {
                        reference: 'Encounter/ca757171-c26c-4a83-ad02-d9d44024e01e',
                        type: 'Encounter'
                      }
                    ],
                  period:
                    {
                      start: '2023-09-18T23:38:43.252179+00:00'
                    }
                }
            }
        }
      ]
  };

  console.log('Invoices: ', invoices);
  const isFetching = false;
  const icon = <FontAwesome5 name="file-invoice-dollar" size={g.size(36)} color="white" />;

  return (

    <ListView clickable icon={icon} items={invoices.entry} title="Invoices" isFetching={isFetching} />
  );
}

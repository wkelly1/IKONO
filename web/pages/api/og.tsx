import Meta from '../../meta.json';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

function DefaultResponse() {
  return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
    width: 1200,
    height: 630
  });
}

export default async function handler(request: NextRequest) {
  const fontData = await fetch(
    new URL('../../assets/ArchivoBlack-Regular.ttf', import.meta.url)
  ).then(res => res.arrayBuffer());

  const poppinsFontData = await fetch(
    new URL('../../assets/Poppins-Regular.ttf', import.meta.url)
  ).then(res => res.arrayBuffer());

  const poppinsSemiBoldFontData = await fetch(
    new URL('../../assets/Poppins-SemiBold.ttf', import.meta.url)
  ).then(res => res.arrayBuffer());

  const { searchParams } = request.nextUrl;
  const icon = searchParams.get('icon');
  const similarCount = searchParams.get('similar_count');
  const version = searchParams.get('version');
  const variant = searchParams.get('variant');
  const size = searchParams.get('size');

  if (!icon) {
    return DefaultResponse();
  }

  const iconMeta = Meta[icon];

  if (
    !iconMeta ||
    !variant ||
    !size ||
    variant !== 'standard' ||
    !['sm', 'base'].includes(size)
  ) {
    return DefaultResponse();
  }
  const svgBase64 = Buffer.from(iconMeta.variants[variant][size].svg).toString(
    'base64'
  );
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          fontFamily: 'Poppins'
        }}
        tw="border-b-[15px] border-blue-600"
      >
        <div tw="flex flex-col w-1/2 px-24 py-20 h-full justify-between">
          <div tw="flex flex-col">
            <p
              tw="text-3xl text-blue-600 inline mb-0"
              style={{ fontFamily: 'Archivo' }}
            >
              IKONO
            </p>
            <p tw="text-lg text-gray-400">
              Icons Created by<span tw="text-gray-600 ml-1">Will Kelly</span>
            </p>
          </div>
          <div tw="flex flex-col">
            <p tw="text-4xl -mb-2">{icon}</p>
            <p tw="text-2xl text-gray-300 tracking-tight">
              <span tw="text-gray-500">{variant} </span> /{' '}
              <span tw="text-gray-500"> {size}</span>
            </p>
          </div>
          <div tw="flex">
            {version && version.match(/^v\d+\.\d+\.\d+$/) && (
              <div tw="flex flex-col mr-24">
                <p tw="-mb-2 text-3xl">{version}</p>
                <p tw="text-gray-500">Version</p>
              </div>
            )}
            <div tw="flex flex-col mr-24">
              <p tw="-mb-2 text-3xl">MIT</p>
              <p tw="text-gray-500">Licence</p>
            </div>
            {similarCount && similarCount.match(/^\d+$/) && (
              <div tw="flex flex-col">
                <p tw="-mb-2 text-3xl">{similarCount}</p>
                <p tw="text-gray-500">Similar icons</p>
              </div>
            )}
          </div>
        </div>
        <div tw="flex w-1/2 justify-center items-center h-full">
          <div tw="flex border-[5px] border-solid border-blue-600 w-[200px] h-[200px] flex justify-center items-center">
            <img
              src={`data:image/svg+xml;base64,${svgBase64}`}
              alt="Dynamic Image"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'ArchivoBlack',
          data: fontData,
          style: 'normal'
        },
        {
          name: 'Poppins',
          data: poppinsFontData,
          style: 'normal'
        },
        {
          name: 'Poppins',
          data: poppinsSemiBoldFontData,
          style: 'normal',
          weight: 400
        }
      ]
    }
  );
}

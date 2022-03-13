import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


interface reactQuaryDataProps {
  pages: {
    data: {
      title: string;
      description: string;
      url: string;
      ts: number;
      id: string;
    }[]
  }[]
}


interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {

  const fetchImages = async ({ pageParam = null }) => {

    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    console.log(data);

    return data;

  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage?.after || null, // TODO GET AND RETURN NEXT PAGE PARAM
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });

    return formatted;
  }, [data]);

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {formattedData ? <CardList cards={formattedData} /> : ''}

        {isLoading ? <Loading /> : <> </>}
        {isError ? <Error /> : <> </>}

        {hasNextPage ? <Button
          mt={4}
          size='md'
          isLoading={isFetchingNextPage}
          onClick={() => { fetchNextPage() }}
          variant='solid'
          loadingText='Carregando...'
          disabled={isFetchingNextPage}
        >
          Carregar mais
        </Button>
          : <> </>
        }
      </Box>
    </>
  );
}


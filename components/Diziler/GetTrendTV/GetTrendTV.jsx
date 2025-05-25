import React from 'react'

import { tmdb } from '@/lib/api/tmdb';
import Image from 'next/image';
import SectionCards from '@/components/partials/SectionCards/SectionCards';

async function GetTrendTv() {
    const data = await tmdb.getTrendingTV();
    const results=data.results;
    
    return (
        
        <SectionCards results={results} title={"Bu Haftanın Trendleri"}/>
    )
}

export default GetTrendTv
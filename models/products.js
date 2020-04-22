const prouducts =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({id:`1`,title:'Full Studio Suite #3 - The Lake at Blue Mountains',description:`4 guests • 1 bedroom • 1 bed • 1 bath • Wifi • Kitchen • Freen parking`,type:`ENTIRE APARTMENT`,price:`163`, rate:`4.5/5`,image:`/images/room2.jpg`, location:"Toronto"});
    
        this.fakeDB.push({id:`2`,title:'Mountain Access Studio Gataway-ski-in-ski-out',description:`2 guests • 1 bedroom • 1 bed • 1 bath • Wifi • Kitchen • free parking`,type:`ENTIRE GUEST SUITE`,price:`198`,rate:`4.6/5`,image:`/images/room3.jpg`, location:"Toronto"});

        this.fakeDB.push({id:`3`,title:'Creekside Studio at Blue Mtn. and Dog Friendly',description:`4 guests • 1 bedroom • 1 bed • 1 bath • Hot tub • Wifi • Kitchen • Free parking`,type:`ENTIRE CONDOMINIUM`,price:`175`,rate:`4.3/5`,image:`/images/room4.jpg`, location:"Toronto"});

        this.fakeDB.push({id:`4`,title:'Tiny Home Tranquility',description:`4 guests • Studio • 2 bed • 1 bath • Hot tub • Wifi • Kitchen •free parking`,type:`ENTIRE CONDOMINIUM`,price:`225`,rate:`4.8/5`,image:`/images/room8.jpg`, location:"Montreal"});

        this.fakeDB.push({id:`5`,title:'Earthship Escape',description:`2 guests • 1 bedroom • 1 bed • 1.5 bath • Hot tub • Wifi • Kitchen • free parking`,type:`ENTIRE HOUSE`,price:`156`,rate:`4.2/5`,image:`/images/room6.jpg`, location:"Montreal"});

        this.fakeDB.push({id:`6`,title:'Telfer',description:`2 guests • Studio • 1 bed • 1 bath • Hot tub • Wifi • Kitchen •free parking`,type:`ENTIRE APARTMENT`,price:`257`,rate:`4.6/5`,image:`/images/room8.jpg`, location:"Montreal"});
    

    },
    getallProducts()
    {
        return this.fakeDB;
    }

}


prouducts.init();
module.exports=prouducts;
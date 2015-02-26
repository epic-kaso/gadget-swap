<?php namespace SupergeeksGadgetSwap\Http\Requests;

use Input;
use Maatwebsite\Excel\Files\ExcelFile;

class ImportExcelToTicket extends ExcelFile {

    public function getFile()
    {
        //return storage_path('exports') . '/file.csv';
        // Import a user provided file
        $file = Input::file('excelFile');
        $filename = $file->move(storage_path('import'),'import.'.$file->getExtension());
        //$this->doSomethingLikeUpload($file);
        // Return it's location
        return $filename->getPathname();
    }

    public function getFilters()
    {
        return [
            'chunk'
        ];
    }

}

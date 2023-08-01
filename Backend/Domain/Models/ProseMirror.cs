public class ProseMirrorDocument
{
    public string Type { get; set; }
    public List<ProseMirrorNode> Content { get; set; }
}

public class ProseMirrorNode
{
    public string Type { get; set; }
    public string Text { get; set; }
    public List<ProseMirrorNode> Content { get; set; }
}